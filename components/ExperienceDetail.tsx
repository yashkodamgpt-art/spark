import React, { useState } from 'react';
import { EnhancedExperience, ExperienceStep } from '../types';
import Button from './Button';
import AIGuidedStep from './AIGuidedStep';
import SimpleStepList from './SimpleStepList';

interface ExperienceDetailProps {
  experience: EnhancedExperience;
  userTier: 'free' | 'premium';
  onBack: () => void;
  onComplete: () => void;
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({ experience, userTier, onBack, onComplete }) => {
  const [mode, setMode] = useState<'overview' | 'guided' | 'simple'>('overview');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Flatten steps from all phases into a single array for easier navigation
  const allSteps = experience.phases.flatMap(phase => phase.steps);
  const currentStep = allSteps[activeStepIndex];

  const handleStepComplete = () => {
    if (activeStepIndex < allSteps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (mode === 'simple') {
    return (
      <SimpleStepList 
        experience={experience} 
        onComplete={onComplete} 
        onBack={() => setMode('overview')} 
      />
    );
  }

  if (mode === 'guided') {
      return (
          <div className="h-[calc(100vh-100px)]">
              <AIGuidedStep 
                step={currentStep}
                stepNumber={activeStepIndex + 1}
                totalSteps={allSteps.length}
                onComplete={handleStepComplete}
                onBack={() => activeStepIndex > 0 ? setActiveStepIndex(prev => prev - 1) : setMode('overview')}
                aiPersona={experience.ai_guidance.persona}
                aiTone={experience.ai_guidance.tone}
              />
          </div>
      )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-200 animate-fade-in-up">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80">
        <img src={experience.hero_image} alt={experience.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-2xl">
           <div className="flex gap-2 mb-2">
             <span className="bg-primary/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{experience.category}</span>
             <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">{experience.estimated_time.typical} min</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold mb-2">{experience.title}</h1>
           <p className="text-white/90 text-sm md:text-base font-medium">{experience.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-10 space-y-10">
        
        {/* Intro */}
        <section>
            <p className="text-gray-600 text-lg leading-relaxed">{experience.description}</p>
        </section>

        {/* Requirements */}
        <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    What You Need
                </h3>
                <ul className="space-y-3">
                    {experience.prerequisites.required_items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-1 w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></span>
                            <div>
                                <span className="font-medium text-gray-800">{item.name}</span>
                                <span className="text-gray-500 block text-xs">{item.where_to_find}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Experience Goals
                </h3>
                 <ul className="space-y-3">
                    {experience.success_criteria.map((goal, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                            <span className="mt-1 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                            {goal.criterion}
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Phase Breakdown */}
        <section>
            <h3 className="font-bold text-gray-900 text-xl mb-6">Your Journey</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                {experience.phases.map((phase, i) => (
                    <div key={i} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{phase.title}</h4>
                        <p className="text-gray-500 text-sm mb-3">{phase.description} • {phase.estimated_time} min</p>
                        <ul className="space-y-1">
                            {phase.steps.map((step, j) => (
                                <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    {step.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA */}
        <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-3">
            <Button size="lg" onClick={() => setMode(userTier === 'premium' ? 'guided' : 'simple')} className="px-12 py-4 text-lg shadow-xl shadow-blue-200">
                Start Experience
            </Button>
            {userTier === 'free' && (
              <p className="text-sm text-gray-500">
                 Using Free Checklist Mode. <span className="text-primary font-medium cursor-pointer">Upgrade to Premium</span> for AI Guidance.
              </p>
            )}
            {userTier === 'premium' && (
              <p className="text-xs text-primary font-medium flex items-center gap-1">
                 ✨ AI Mentor Active
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;