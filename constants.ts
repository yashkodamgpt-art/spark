import { EnhancedExperience } from './types';

export const INITIAL_CHAT_MESSAGE = "Hi! I'm Spark, your guide to discovering new experiences. I'd love to curate a custom week of activities for you. To start, could you tell me a little bit about yourself and what you enjoy doing in your free time?";

export const MOCK_EXPERIENCES: EnhancedExperience[] = [
  {
    id: "exp_juggle_001",
    title: "Learn to Juggle Three Balls",
    tagline: "From zero to juggling in one session",
    description: "Juggling isn't about talent - it's about breaking down a complex movement into simple steps. In this experience, you'll learn the cascade pattern, the foundation of all juggling.",
    
    category: "Physical Skills",
    subcategory: "Juggling",
    tags: ["coordination", "fun", "party-trick", "stress-relief", "no-equipment-needed"],
    
    difficulty_level: "absolute_beginner",
    estimated_time: {
      minimum: 30,
      typical: 45,
      extended: 90
    },
    budget: {
      level: "free",
      estimated_cost: "$0 - $5",
      alternatives: "Use rolled-up socks, small stuffed toys, or tennis balls"
    },
    
    prerequisites: {
      required_items: [
        {
          name: "Three similar balls",
          description: "Ideally beanbag-style juggling balls",
          required: true,
          where_to_find: "Sports store or DIY",
          approximate_cost: "$5-10",
          alternatives: ["Rolled up socks (best for beginners!)", "Tennis balls", "Small oranges"],
          image_url: "https://picsum.photos/seed/juggling_balls/200/200"
        }
      ],
      optional_items: [
        {
          name: "Soft surface below",
          description: "A bed or carpet to practice over",
          required: false,
          where_to_find: "Bedroom",
          approximate_cost: "Free",
          alternatives: ["Stand over a bed"]
        }
      ],
      required_skills: [],
      required_experiences: [],
      physical_requirements: ["Basic arm mobility", "Can stand for 30+ minutes"],
      space_requirements: "High ceilings not required, just arm room"
    },
    
    phases: [
      {
        id: "phase_1",
        phase_number: 1,
        title: "One Ball Foundation",
        description: "Master the basic throw and catch pattern with a single ball",
        estimated_time: 10,
        steps: [
          {
            id: "step_1_1",
            step_number: 1,
            title: "The Scoop Throw",
            instruction: "Hold one ball in your dominant hand. Throw the ball in a gentle arc to your other hand - the ball should peak at about eye level.",
            detailed_explanation: "The key to juggling is consistency. Imagine there's a point above your head, exactly between your hands - the ball should pass through this point every time.",
            image_url: "https://picsum.photos/seed/juggle1/600/400",
            interaction_type: "do",
            user_action_required: "Throw and catch 10 times",
            expected_outcome: "Ball lands consistently without reaching",
            common_mistakes: [
              {
                mistake: "Throwing too high",
                why_it_happens: "Nervous energy",
                how_to_fix: "Aim for eye level only.",
                how_to_prevent: "Pick a spot on the wall at eye level"
              }
            ],
            tips: ["Rolled-up socks don't roll away when dropped", "Stand over a bed"],
            if_stuck: {
              first_hint: "Try throwing a bit lower. Most beginners throw too high.",
              second_hint: "Check your elbow position - it should stay at your side.",
              detailed_walkthrough: "Stand naturally. Push with your forearm, keeping your wrist straight. The ball travels in a smooth arc peaking just above eye level.",
              alternative_approach: "Throw against a wall for a rebound catch.",
              skip_option: { available: false, consequence: "Critical foundation" }
            },
            checkpoint: {
              type: "self_check",
              prompt: "Can you throw 10 times without moving your feet?",
              validation_hint: "If you're chasing the ball, keep practicing"
            },
            ai_prompts: {
              introduction: "Let's start with the most important skill in juggling - a consistent throw. Everything else builds on this!",
              during_step: "How are your throws going? Are you finding a consistent arc?",
              on_completion: "Excellent! You've just learned the throw that makes everything else possible.",
              on_struggle: "This is where everyone drops the ball. Let's break it down."
            }
          },
          {
            id: "step_1_2",
            step_number: 2,
            title: "Reverse Direction",
            instruction: "Now throw from your non-dominant hand to your dominant hand. Same arc, same height.",
            detailed_explanation: "Your non-dominant hand will feel awkward - that's normal. It might take twice as many attempts.",
            interaction_type: "do",
            user_action_required: "Throw and catch 20 times non-dominant to dominant",
            expected_outcome: "Throws feel similar to the other direction",
            common_mistakes: [
              {
                mistake: "Throws go off to side",
                why_it_happens: "Less muscle control",
                how_to_fix: "Do 20 more throws than you think you need.",
                how_to_prevent: "Focus on elbow position"
              }
            ],
            tips: ["It's okay if this takes longer"],
            if_stuck: {
              first_hint: "Slow down. Gentle practice.",
              second_hint: "Make the throw smaller - lower arc is easier.",
              detailed_walkthrough: "Focus on keeping the motion small and controlled.",
              alternative_approach: "Practice just the release.",
              skip_option: { available: false, consequence: "Required for 3 balls" }
            },
            checkpoint: {
              type: "self_check",
              prompt: "Can you alternate throws for 10 reps?",
              validation_hint: "Both directions should feel similar"
            },
            ai_prompts: {
              introduction: "Time to train your other hand! It will feel clumsy at first.",
              during_step: "How's the non-dominant hand doing?",
              on_completion: "You've trained your non-dominant hand! Well done.",
              on_struggle: "Be patient with your other hand."
            }
          }
        ],
        phase_checkpoint: {
          question: "Can you alternate single throws 20 times without dropping?",
          success_indicator: "Throws feel automatic",
          if_stuck: "Spend 5 more minutes here."
        }
      },
      {
        id: "phase_2",
        phase_number: 2,
        title: "Two Ball Exchange",
        description: "Learn the exchange pattern basis",
        estimated_time: 15,
        steps: [
          {
            id: "step_2_1",
            step_number: 3,
            title: "Hold Two, Throw One",
            instruction: "Hold one ball in each hand. Throw right ball. When it peaks, throw left ball. Catch right, then catch left.",
            detailed_explanation: "Timing is key: throw the second ball when the first ball reaches its peak.",
            interaction_type: "do",
            user_action_required: "Complete 10 exchanges starting with dominant hand",
            expected_outcome: "Both balls caught cleanly",
            common_mistakes: [
              {
                mistake: "Throwing too early",
                why_it_happens: "Panic",
                how_to_fix: "Wait longer than feels comfortable.",
                how_to_prevent: "Say 'throw' at the peak"
              }
            ],
            tips: ["Throw-Throw-Catch-Catch rhythm"],
            if_stuck: {
              first_hint: "Make sure you throw, not hand off.",
              second_hint: "Say 'one... two' out loud.",
              detailed_walkthrough: "Throw right. Wait for peak. Throw left UNDER the first ball. Catch right ball in left hand. Catch left ball in right hand.",
              alternative_approach: "Use bean bags for slower fall.",
              skip_option: { available: false, consequence: "Critical step" }
            },
            checkpoint: {
              type: "self_check",
              prompt: "Can you do the exchange 10 times?",
              validation_hint: "Balls must cross in air"
            },
            ai_prompts: {
              introduction: "Here's where it gets exciting! The magic exchange.",
              during_step: "Throw second ball at the PEAK. Not before.",
              on_completion: "You just juggled two balls!",
              on_struggle: "Slowing it down usually helps."
            }
          }
        ],
        phase_checkpoint: {
          question: "Can you do 20 exchanges alternating starting hands?",
          success_indicator: "Rhythmic pattern",
          if_stuck: "Keep practicing this exchange."
        }
      },
      {
        id: "phase_3",
        phase_number: 3,
        title: "Three Ball Juggling",
        description: "Add the third ball",
        estimated_time: 20,
        steps: [
          {
            id: "step_3_1",
            step_number: 4,
            title: "Three Throws, Three Catches",
            instruction: "Start with two balls in dominant hand, one in other. Throw-throw-throw, then catch-catch-catch. Stop.",
            detailed_explanation: "Don't try to continue. Just do three throws and stop.",
            interaction_type: "do",
            user_action_required: "10 rounds of 3 throws/catches",
            expected_outcome: "All balls caught",
            common_mistakes: [
              {
                mistake: "Third throw goes wild",
                why_it_happens: "Rushing",
                how_to_fix: "Throw three is identical to throw one.",
                how_to_prevent: "Focus on rhythm"
              }
            ],
            tips: ["Throw one and three are same hand"],
            if_stuck: {
              first_hint: "Are all throws same height?",
              second_hint: "Count '1-2-3' loud.",
              detailed_walkthrough: "Throw 1 (dom), Throw 2 (non-dom), Throw 3 (dom). Catch-Catch-Catch.",
              alternative_approach: "Listen to music.",
              skip_option: { available: false, consequence: "Core pattern" }
            },
            checkpoint: {
              type: "self_check",
              prompt: "Can you catch all 3?",
              validation_hint: "Reset after each try"
            },
            ai_prompts: {
              introduction: "Here we go - 3 balls! Ready?",
              during_step: "Keep rhythm steady. No rushing.",
              on_completion: "YOU JUGGLED 3 BALLS!",
              on_struggle: "Let's break it down throw by throw."
            }
          }
        ],
        phase_checkpoint: {
          question: "Can you juggle 3 throws consistently?",
          success_indicator: "Yes!",
          if_stuck: "Practice makes perfect."
        }
      }
    ],
    
    ai_guidance: {
      persona: "Encouraging Juggler Friend",
      tone: "Enthusiastic but patient",
      common_struggles: [
        {
          trigger_phrase: ["keep dropping"],
          response: "Dropping is part of learning! Professionals drop all the time.",
          additional_help: "Stand over a bed."
        }
      ],
      encouragement_triggers: ["yes", "did it", "caught"],
      completion_celebration: "🎉 You've learned to juggle! This is a rare skill."
    },
    
    success_criteria: [
      { criterion: "Juggle 20 catches", how_to_verify: "Count out loud", partial_success: "10 catches" }
    ],
    what_you_learned: ["Cascade pattern", "Rhythm", "Patience"],
    next_experiences: ["exp_juggle_002"],
    
    hero_image: "https://picsum.photos/seed/juggling_hero/800/600",
    gallery: [],
    example_outcomes: [],
  },
  {
    id: "exp_tech_aiapp_001",
    title: "Build Your First App with AI Studio",
    tagline: "Create a working app in 30 minutes, no coding needed",
    description: "You don't need code to build an app. Using Google AI Studio, you'll create a real, working application powered by AI.",
    
    category: "Technology",
    subcategory: "No-Code",
    tags: ["no-code", "ai", "creative", "beginner"],
    
    difficulty_level: "absolute_beginner",
    estimated_time: {
      minimum: 20,
      typical: 35,
      extended: 60
    },
    budget: {
      level: "free",
      estimated_cost: "$0",
      alternatives: "Free with Google account"
    },
    
    prerequisites: {
      required_items: [
        {
          name: "Computer",
          description: "Laptop or Desktop",
          required: true,
          where_to_find: "Home",
          approximate_cost: "Free",
          alternatives: [],
          image_url: "https://picsum.photos/seed/computer/200/200"
        }
      ],
      optional_items: [],
      required_skills: ["Basic typing"],
      required_experiences: [],
      physical_requirements: [],
      space_requirements: "Desk"
    },
    
    phases: [
      {
        id: "phase_1",
        phase_number: 1,
        title: "Setup AI Studio",
        description: "Get access and understand the tool",
        estimated_time: 5,
        steps: [
          {
            id: "step_1_1",
            step_number: 1,
            title: "Open AI Studio",
            instruction: "Go to aistudio.google.com and sign in.",
            detailed_explanation: "Google AI Studio is a playground for AI.",
            interaction_type: "do",
            user_action_required: "Sign in to AI Studio",
            expected_outcome: "Homepage visible",
            common_mistakes: [],
            tips: ["Use Chrome"],
            if_stuck: {
              first_hint: "Use your Google account.",
              second_hint: "Search Google AI Studio",
              detailed_walkthrough: "Go to URL, click sign in.",
              alternative_approach: "N/A",
              skip_option: { available: false, consequence: "Required" }
            },
            checkpoint: { type: "self_check", prompt: "Are you signed in?", validation_hint: "See 'Create new'" },
            ai_prompts: {
              introduction: "Let's get you into AI Studio.",
              during_step: "Having trouble accessing?",
              on_completion: "You're in!",
              on_struggle: "Let me help you find the URL."
            }
          }
        ],
        phase_checkpoint: { question: "Ready to create?", success_indicator: "Yes", if_stuck: "Check internet" }
      },
      {
        id: "phase_2",
        phase_number: 2,
        title: "Writing Your Prompt",
        description: "Create the instructions for your app",
        estimated_time: 15,
        steps: [
          {
            id: "step_2_1",
            step_number: 2,
            title: "Create Chat Prompt",
            instruction: "Click 'Create new prompt' and select 'Chat prompt'.",
            detailed_explanation: "Chat prompts allow interactive conversation.",
            interaction_type: "do",
            user_action_required: "Create chat prompt",
            expected_outcome: "Chat interface visible",
            common_mistakes: [],
            tips: ["Look for the + button"],
            if_stuck: {
              first_hint: "Top left corner.",
              second_hint: "Select Chat.",
              detailed_walkthrough: "Click Create New -> Chat Prompt.",
              alternative_approach: "N/A",
              skip_option: { available: false, consequence: "Required" }
            },
            checkpoint: { type: "self_check", prompt: "See System Instructions box?", validation_hint: "Left side" },
            ai_prompts: {
              introduction: "Let's build the foundation.",
              during_step: "Found the button?",
              on_completion: "Perfect setup.",
              on_struggle: "Look for the blue button."
            }
          },
          {
            id: "step_2_2",
            step_number: 3,
            title: "Define Personality",
            instruction: "In 'System Instructions', write what your app does. E.g., 'You are a friendly chef who suggests recipes.'",
            detailed_explanation: "This tells the AI how to behave.",
            interaction_type: "do",
            user_action_required: "Write instructions",
            expected_outcome: "Clear personality defined",
            common_mistakes: [],
            tips: ["Be specific about tone"],
            if_stuck: {
              first_hint: "Start with 'You are a...'",
              second_hint: "Add 'Your goal is...'",
              detailed_walkthrough: "Type: 'You are a [role] who helps with [task].'",
              alternative_approach: "Copy a template.",
              skip_option: { available: false, consequence: "App won't work" }
            },
            checkpoint: { type: "self_check", prompt: "Written 3 sentences?", validation_hint: "Define role and goal" },
            ai_prompts: {
              introduction: "Give your app a soul!",
              during_step: "What's the personality?",
              on_completion: "Great description.",
              on_struggle: "Try a Joke Generator idea."
            }
          }
        ],
        phase_checkpoint: { question: "App defined?", success_indicator: "Yes", if_stuck: "Review guide" }
      }
    ],
    ai_guidance: {
      persona: "Tech Friend",
      tone: "Demystifying",
      common_struggles: [],
      encouragement_triggers: ["works", "cool"],
      completion_celebration: "🎉 You built an app!"
    },
    success_criteria: [],
    what_you_learned: ["Prompt Engineering", "AI Studio"],
    next_experiences: [],
    hero_image: "https://picsum.photos/seed/ai_app/800/600",
    gallery: [],
    example_outcomes: []
  }
];
