import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, UserProfile, ExperienceStep } from "../types";

const API_KEY = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

const SYSTEM_INSTRUCTION = `You are Spark, a friendly, enthusiastic guide helping users discover new experiences. 
Your goal is to learn about their personality, interests, and constraints through natural conversation. 
Ask engaging questions ONE AT A TIME, and respond warmly to their answers.

Focus on extracting:
1. Personality traits (creative, analytical, adventurous, etc.)
2. Interests/Hobbies
3. Budget (low/medium/high)
4. Time availability (15min/30min/1hr/2hr+)
5. Environment preferences

Keep it brief and conversational.`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!ai) return "Error: API Key not configured.";

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history.filter(m => m.role !== 'system').map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }))
        });

        const result = await chat.sendMessage({ message: newMessage });
        return result.text || "I'm sorry, I didn't catch that.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I'm having a little trouble connecting to my thought process right now. Please try again.";
    }
};

export const generateUserProfile = async (conversationHistory: ChatMessage[]): Promise<UserProfile | null> => {
    if (!ai) return null;

    const conversationText = conversationHistory
        .map(m => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n');

    const prompt = `
    Based on the following conversation, extract the user's profile information into JSON.
    
    Conversation:
    ${conversationText}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        personality_data: {
                            type: Type.OBJECT,
                            properties: {
                                traits: { type: Type.ARRAY, items: { type: Type.STRING } },
                                interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                                goals: { type: Type.ARRAY, items: { type: Type.STRING } },
                            }
                        },
                        preferences: {
                            type: Type.OBJECT,
                            properties: {
                                budget: { type: Type.STRING, enum: ["low", "medium", "high"] },
                                time_available: { type: Type.STRING, enum: ["15min", "30min", "1hr", "2hr+"] },
                                environment: { type: Type.ARRAY, items: { type: Type.STRING } },
                                activity_level: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        });

        const jsonText = response.text;
        if (jsonText) {
            const data = JSON.parse(jsonText);
            return {
                id: crypto.randomUUID(),
                ...data
            } as UserProfile;
        }
        return null;

    } catch (error) {
        console.error("Profile Generation Error:", error);
        return null;
    }
};

export const getStepGuidance = async (
  step: ExperienceStep,
  userMessage: string,
  conversationHistory: ChatMessage[],
  hintLevel: number,
  aiPersona: string,
  aiTone: string
): Promise<string> => {
  if (!ai) return "I can't connect to AI right now, but I'm here to help you through this step!";

  const systemPrompt = `
You are ${aiPersona}. You're helping someone complete a step-by-step experience.
Your tone is: ${aiTone}

CURRENT STEP: "${step.title}"
INSTRUCTION: ${step.instruction}
DETAILS: ${step.detailed_explanation}
COMMON MISTAKES: ${JSON.stringify(step.common_mistakes)}
HINTS GIVEN SO FAR: ${hintLevel}

Previous messages:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

Rules:
1. Keep responses brief (2-4 sentences) unless they ask for more detail
2. Be encouraging - celebrate small progress
3. If they seem stuck, offer a hint (don't give away the answer immediately)
4. If they say they're done, congratulate them and ask about the checkpoint
5. Stay in character as ${aiPersona}

User says: "${userMessage}"

Respond naturally and helpfully.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPrompt
    });
    return response.text || "Let's keep going, you're doing great!";
  } catch (error) {
      console.error("Guidance Error:", error);
      return "I'm having trouble thinking right now, but try following the instructions carefully.";
  }
};
