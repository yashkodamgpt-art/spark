export interface UserProfile {
  id: string;
  name?: string;
  tier: 'free' | 'premium';
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

export interface MaterialItem {
  name: string;
  description: string;
  required: boolean;
  where_to_find: string;
  approximate_cost: string;
  alternatives: string[];
  image_url?: string;
}

export interface CommonMistake {
  mistake: string;
  why_it_happens: string;
  how_to_fix: string;
  how_to_prevent: string;
}

export interface StuckHelp {
  first_hint: string;
  second_hint: string;
  detailed_walkthrough: string;
  alternative_approach: string;
  skip_option: {
    available: boolean;
    consequence: string;
  };
}

export interface StepVariation {
  condition: string;
  modified_instruction: string;
}

export interface ExperienceStep {
  id: string;
  step_number: number;
  title: string;
  instruction: string;
  detailed_explanation: string;
  
  // Visual aids
  image_url?: string;
  video_url?: string;
  video_timestamp?: string;
  diagram_description?: string;
  
  // Interaction
  interaction_type: 'do' | 'observe' | 'decide' | 'wait' | 'check';
  user_action_required: string;
  expected_outcome: string;
  
  // Help system
  common_mistakes: CommonMistake[];
  tips: string[];
  if_stuck: StuckHelp;
  
  // Checkpoints
  checkpoint: {
    type: 'self_check' | 'photo_upload' | 'question_answer' | 'timer_complete';
    prompt: string;
    validation_hint: string;
  };
  
  // Variations
  variations?: StepVariation[];
  
  // AI prompts
  ai_prompts: {
    introduction: string;
    during_step: string;
    on_completion: string;
    on_struggle: string;
  };
}

export interface ExperiencePhase {
  id: string;
  phase_number: number;
  title: string;
  description: string;
  estimated_time: number; // minutes
  steps: ExperienceStep[];
  phase_checkpoint: {
    question: string;
    success_indicator: string;
    if_stuck: string;
  };
}

export interface CommonStruggle {
  trigger_phrase: string[];
  response: string;
  additional_help: string;
}

export interface SuccessCriterion {
  criterion: string;
  how_to_verify: string;
  partial_success: string;
}

export interface ExampleOutcome {
  description: string;
  image_url: string;
  skill_level: string;
  time_taken: string;
}

export interface EnhancedExperience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  
  category: string;
  subcategory: string;
  tags: string[];
  
  difficulty_level: 'absolute_beginner' | 'beginner' | 'intermediate' | 'advanced';
  estimated_time: {
    minimum: number;
    typical: number;
    extended: number;
  };
  budget: {
    level: 'free' | 'low' | 'medium' | 'high';
    estimated_cost: string;
    alternatives: string;
  };
  
  prerequisites: {
    required_items: MaterialItem[];
    optional_items: MaterialItem[];
    required_skills: string[];
    required_experiences: string[];
    physical_requirements: string[];
    space_requirements: string;
  };
  
  phases: ExperiencePhase[];
  
  ai_guidance: {
    persona: string;
    tone: string;
    common_struggles: CommonStruggle[];
    encouragement_triggers: string[];
    completion_celebration: string;
  };
  
  success_criteria: SuccessCriterion[];
  what_you_learned: string[];
  next_experiences: string[];
  
  hero_image: string;
  gallery: string[];
  example_outcomes: ExampleOutcome[];
}

export interface WeeklyPackage {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  experiences: string[]; // IDs
  status: 'active' | 'completed' | 'expired';
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  type?: 'guidance' | 'question' | 'hint' | 'celebration' | 'struggle' | 'general';
}

export type ViewState = 'landing' | 'chat' | 'dashboard' | 'experience_detail';

export interface AppState {
  view: ViewState;
  userProfile: UserProfile | null;
  currentPackage: WeeklyPackage | null;
  selectedExperienceId: string | null;
}