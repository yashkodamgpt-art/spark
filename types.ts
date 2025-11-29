export interface UserProfile {
  id: string;
  name?: string;
  personality_data: {
    traits: string[];
    interests: string[];
    goals: string[];
  };
  preferences: {
    budget: 'low' | 'medium' | 'high';
    time_available: '15min' | '30min' | '1hr' | '2hr+';
    environment: string[];
    activity_level: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_time: string;
  budget_required: 'low' | 'medium' | 'high';
  instructions: {
    intro: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
      tip?: string;
      video_timestamp?: string;
    }>;
  };
  video_links: Array<{
    title: string;
    url: string;
    duration: string;
  }>;
  resource_links: Array<{
    title: string;
    url: string;
  }>;
  tags: string[];
  materials?: string[];
  success_criteria: string[];
  imageUrl?: string;
}

export interface WeeklyPackage {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  experiences: string[]; // Array of experience IDs
  status: 'active' | 'completed' | 'expired';
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

export type ViewState = 'landing' | 'chat' | 'dashboard' | 'experience_detail';

export interface AppState {
  view: ViewState;
  userProfile: UserProfile | null;
  currentPackage: WeeklyPackage | null;
  selectedExperienceId: string | null;
}