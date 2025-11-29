import React, { useState, useRef, useEffect } from 'react';
import { ExperienceStep, ChatMessage } from '../types';
import { getStepGuidance } from '../services/geminiService';

interface AIGuidedStepProps {
  step: ExperienceStep;
  stepNumber: number;
  totalSteps: number;
  onComplete: () => void;
  onBack: () => void;
  aiPersona: string;
  aiTone: string;
}

const AIGuidedStep: React.FC<AIGuidedStepProps> = ({
  step,
  stepNumber,
  totalSteps,
  onComplete,
  onBack,
  aiPersona,
  aiTone
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); 
  const [showDetailedHelp, setShowDetailedHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when step changes
    setMessages([{
      role: 'assistant',
      content: step.ai_prompts.introduction,
      timestamp: Date.now(),
      type: 'guidance'
    }]);
    setHintLevel(0);
    setShowDetailedHelp(false);
  }, [step]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
      type: 'question'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const response = await getStepGuidance(step, inputValue, messages, hintLevel, aiPersona, aiTone);
    
    setIsLoading(false);
    setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        type: 'guidance'
    }]);
  };

  const handleGetHint = () => {
    const hints = [
      step.if_stuck.first_hint,
      step.if_stuck.second_hint,
      step.if_stuck.detailed_walkthrough
    ];

    if (hintLevel < hints.length) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `💡 Hint: ${hints[hintLevel]}`,
        timestamp: Date.now(),
        type: 'hint'
      }]);
      setHintLevel(prev => prev + 1);
    } else {
      setShowDetailedHelp(true);
    }
  };

  const handleMarkComplete = () => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: step.ai_prompts.on_completion,
      timestamp: Date.now(),
      type: 'celebration'
    }]);
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500 font-medium">
            Step {stepNumber} of {totalSteps}
          </div>
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            ← Previous
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
          <p className="text-blue-900 font-medium">{step.instruction}</p>
        </div>

        {step.image_url && (
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-100">
            <img 
              src={step.image_url} 
              alt={step.title}
              className="w-full max-h-48 object-cover"
            />
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : msg.type === 'celebration'
                    ? 'bg-green-100 text-green-900 border border-green-200 rounded-bl-none'
                    : msg.type === 'hint'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-bl-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1 items-center border border-gray-200">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Controls */}
      <div className="bg-white border-t p-4">
         <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
                onClick={handleGetHint}
                className="whitespace-nowrap text-xs font-medium px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
            >
                💡 Need a hint
            </button>
            <button
                onClick={() => setShowDetailedHelp(true)}
                className="whitespace-nowrap text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
                📖 Detailed Guide
            </button>
         </div>

         <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask for help or update status..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
         </div>

         <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500">
               <span className="font-semibold text-gray-700">Checkpoint:</span> {step.checkpoint.prompt}
            </div>
            <button
                onClick={handleMarkComplete}
                className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 shadow-sm transition-all"
            >
                ✓ Complete Step
            </button>
         </div>
      </div>

       {/* Detailed Help Modal */}
       {showDetailedHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Detailed Guide</h3>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">{step.detailed_explanation}</p>
            <div className="mb-6">
                 <h4 className="font-bold text-sm text-gray-900 mb-2">Walkthrough</h4>
                 <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">{step.if_stuck.detailed_walkthrough}</p>
            </div>
            
            <h4 className="font-bold text-sm text-gray-900 mb-2">Common Mistakes</h4>
            <div className="space-y-3 mb-6">
              {step.common_mistakes.map((mistake, i) => (
                <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="font-medium text-red-800 text-sm">{mistake.mistake}</p>
                  <p className="text-red-600 text-xs mt-1">Fix: {mistake.how_to_fix}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowDetailedHelp(false)}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGuidedStep;