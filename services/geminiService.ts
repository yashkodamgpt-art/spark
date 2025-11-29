import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, UserProfile } from "../types";

// NOTE: In a real app, this key should be in process.env.API_KEY
// For this demo, we assume the user has configured it in their environment
// or we would prompt them, but per instructions, we assume process.env.API_KEY is available/handled.
// We will rely on the user providing it if running locally, or mocking if not present.

const API_KEY = process.env.API_KEY || ''; 

// We handle the case where key might be missing gracefully in the UI, 
// but here we initialize if possible.
let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

const SYSTEM_INSTRUCTION = `You are a friendly, enthusiastic guide helping users discover new experiences. 
Your goal is to learn about their personality, interests, and constraints through natural conversation. 
Ask engaging questions ONE AT A TIME, and respond warmly to their answers.

Focus on extracting:
1. Personality traits (creative, analytical, adventurous, etc.)
2. Interests/Hobbies
3. Budget (low/medium/high)
4. Time availability (15min/30min/1hr/2hr+)
5. Environment preferences

Keep it brief and conversational. Do not output JSON during the conversation.`;

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!ai) return "Error: API Key not configured.";

    try {
        // We reconstruct the chat history for context
        // Gemini 'contents' format is a bit specific, usually we use chats.create for stateful,
        // but here we are stateless between calls for simplicity in this demo structure, 
        // passing full history each time or just the relevant context.
        // For better performance in a real app, use `ai.chats.create`.
        
        // Let's use the generating content method with history as context string for simplicity
        // or map it to the proper history format if using chat.
        
        // Using chat model for better conversation flow
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
