import { Experience } from './types';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp_001',
    title: 'Watercolor Painting - Sunset',
    description: 'Discover the meditative joy of watercolor painting by creating a simple sunset landscape.',
    category: 'Creative Arts',
    difficulty_level: 'beginner',
    estimated_time: '45 minutes',
    budget_required: 'low',
    materials: [
      'Basic watercolor set',
      'Watercolor paper',
      '2 brushes (large & small)',
      'Cup of water',
      'Paper towel'
    ],
    instructions: {
      intro: "Watercolor is forgiving and beautiful - perfect for beginners!",
      steps: [
        {
          step: 1,
          title: "Set up your space",
          description: "Lay out your materials on a flat surface. Fill your cup with clean water.",
          tip: "Tape your paper down to prevent warping"
        },
        {
          step: 2,
          title: "Wet your paper",
          description: "Using clean water and your large brush, wet the entire top half of your paper."
        },
        {
          step: 3,
          title: "Paint the sky",
          description: "While wet, add yellow at the bottom, then orange, then red at the top. Let blend naturally."
        },
        {
          step: 4,
          title: "Add silhouettes",
          description: "Once dry, paint dark tree or mountain silhouettes at the bottom."
        }
      ]
    },
    video_links: [
      { title: "Watercolor Sunset Tutorial", url: "#", duration: "12:45" }
    ],
    resource_links: [],
    tags: ['creative', 'indoor', 'solo', 'relaxing'],
    success_criteria: ['Created a blended sunset', 'Added silhouettes'],
    imageUrl: 'https://picsum.photos/seed/watercolor/800/600'
  },
  {
    id: 'exp_002',
    title: 'Urban Photography Walk',
    description: 'See your neighborhood with fresh eyes through the lens of a camera (or smartphone).',
    category: 'Creative',
    difficulty_level: 'beginner',
    estimated_time: '1hr',
    budget_required: 'low',
    materials: ['Smartphone or Camera', 'Comfortable walking shoes'],
    instructions: {
      intro: "Photography is about capturing light and perspective.",
      steps: [
        { step: 1, title: "Choose a route", description: "Pick a street you know well but walk it slowly." },
        { step: 2, title: "Look up", description: "Most people only look at eye level. Photograph roof lines and clouds." },
        { step: 3, title: "Find textures", description: "Take close-ups of brick, bark, or pavement." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['outdoor', 'creative', 'active'],
    success_criteria: ['Take 5 photos from unique angles'],
    imageUrl: 'https://picsum.photos/seed/photo/800/600'
  },
  {
    id: 'exp_003',
    title: 'Cook a New Cuisine: Shakshuka',
    description: 'Learn to make this delicious North African dish of poached eggs in spicy tomato sauce.',
    category: 'Culinary',
    difficulty_level: 'intermediate',
    estimated_time: '45 minutes',
    budget_required: 'medium',
    materials: ['Eggs', 'Tomatoes', 'Onions', 'Peppers', 'Spices (Cumin, Paprika)'],
    instructions: {
      intro: "A one-pan meal that looks fancy but is actually quite simple.",
      steps: [
        { step: 1, title: "Sauté vegetables", description: "Cook onions and peppers until soft." },
        { step: 2, title: "Simmer sauce", description: "Add tomatoes and spices, simmer for 10 mins." },
        { step: 3, title: "Poach eggs", description: "Make wells in the sauce and crack eggs into them. Cover and cook." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['indoor', 'cooking', 'sensory'],
    success_criteria: ['Eggs cooked to preference', 'Balanced spice flavor'],
    imageUrl: 'https://picsum.photos/seed/shakshuka/800/600'
  },
  {
    id: 'exp_004',
    title: 'Origami: Fold a Crane',
    description: 'Master the ancient art of paper folding with the classic peace crane.',
    category: 'Intellectual',
    difficulty_level: 'beginner',
    estimated_time: '15 minutes',
    budget_required: 'low',
    materials: ['Square paper'],
    instructions: {
      intro: "Precision and patience are key to origami.",
      steps: [
        { step: 1, title: "Fold diagonals", description: "Fold corner to corner both ways." },
        { step: 2, title: "Squash fold", description: "Bring corners together to form a smaller square." },
        { step: 3, title: "Bird base", description: "Fold edges to center line." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['indoor', 'focus', 'solo'],
    success_criteria: ['Completed crane stands on its own'],
    imageUrl: 'https://picsum.photos/seed/origami/800/600'
  },
  {
    id: 'exp_005',
    title: 'Start a Micro-Journal',
    description: 'Begin a habit of mindfulness by writing just one sentence about your day.',
    category: 'Wellness',
    difficulty_level: 'beginner',
    estimated_time: '10 minutes',
    budget_required: 'low',
    materials: ['Notebook', 'Pen'],
    instructions: {
      intro: "Journaling doesn't have to be long to be effective.",
      steps: [
        { step: 1, title: "Pick a time", description: "Right before bed or first thing in the morning." },
        { step: 2, title: "Write the date", description: "Keep it chronological." },
        { step: 3, title: "One sentence", description: "Capture the essence of the day or one gratitude." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['indoor', 'mindfulness', 'solo'],
    success_criteria: ['Wrote entry for today'],
    imageUrl: 'https://picsum.photos/seed/journal/800/600'
  },
  {
    id: 'exp_006',
    title: 'Learn 3 Constellations',
    description: 'Head outside at night and learn to navigate the stars.',
    category: 'Intellectual',
    difficulty_level: 'beginner',
    estimated_time: '30 minutes',
    budget_required: 'low',
    materials: ['Star map app (optional)', 'Warm clothes'],
    instructions: {
      intro: "The night sky is a map of stories.",
      steps: [
        { step: 1, title: "Find North", description: "Locate the Big Dipper to find Polaris." },
        { step: 2, title: "Identify Orion", description: "Look for the three belt stars." },
        { step: 3, title: "Find Cassiopeia", description: "Look for the W shape opposite the Big Dipper." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['outdoor', 'nature', 'solo'],
    success_criteria: ['Identified 3 constellations'],
    imageUrl: 'https://picsum.photos/seed/stars/800/600'
  },
  {
    id: 'exp_007',
    title: 'Bodyweight Circuit',
    description: 'A simple high-intensity workout you can do in your living room.',
    category: 'Physical',
    difficulty_level: 'intermediate',
    estimated_time: '20 minutes',
    budget_required: 'low',
    materials: ['Yoga mat (optional)', 'Water'],
    instructions: {
      intro: "Get your heart rate up without equipment.",
      steps: [
        { step: 1, title: "Warm up", description: "5 minutes of light jogging in place." },
        { step: 2, title: "The Circuit", description: "10 pushups, 20 squats, 30 second plank. Repeat 3x." },
        { step: 3, title: "Cool down", description: "Light stretching." }
      ]
    },
    video_links: [],
    resource_links: [],
    tags: ['indoor', 'active', 'health'],
    success_criteria: ['Completed 3 circuits'],
    imageUrl: 'https://picsum.photos/seed/workout/800/600'
  }
];

export const INITIAL_CHAT_MESSAGE = "Hi! I'm your guide to discovering new experiences. I'd love to curate a custom week of activities for you. To start, could you tell me a little bit about yourself and what you enjoy doing in your free time?";
