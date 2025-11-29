import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGE } from '../constants';
import { sendMessageToGemini, generateUserProfile } from '../services/geminiService';
import Button from './Button';

interface ChatInterfaceProps {
  onProfileComplete: (profile: any) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onProfileComplete }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: INITIAL_CHAT_MESSAGE, timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Call Gemini
    const responseText = await sendMessageToGemini(messages, inputValue);
    
    setIsTyping(false);
    const aiMsg: ChatMessage = { role: 'assistant', content: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);

    // Heuristic check to see if we have enough info to generate a profile
    // In a real app, the AI itself could signal "I have enough info" or we check every few turns
    if (messages.length > 5 && messages.length % 2 !== 0) {
       // Attempt to generate profile silently in background
       console.log("Attempting to analyze profile...");
       const profile = await generateUserProfile([...messages, userMsg, aiMsg]);
       if (profile && profile.personality_data.traits.length > 0 && profile.preferences.budget) {
         // Profile is rich enough
         onProfileComplete(profile);
       }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Skip mechanism for demo purposes if API key is missing or user wants to jump ahead
  const handleSkip = () => {
    const mockProfile = {
        id: 'mock_user',
        personality_data: { traits: ['Creative', 'Curious'], interests: ['Art', 'Nature'], goals: ['Relax'] },
        preferences: { budget: 'low', time_available: '1hr', environment: ['indoor'], activity_level: 'low' }
    };
    onProfileComplete(mockProfile);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div>
           <h2 className="font-semibold text-gray-800">Discovery Assistant</h2>
           <p className="text-xs text-gray-500">I'm learning about you to build your perfect week.</p>
        </div>
        <button onClick={handleSkip} className="text-xs text-gray-400 hover:text-primary underline">
            Demo Skip
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            placeholder="Type your answer..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="rounded-full w-10 h-10 !p-0 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;