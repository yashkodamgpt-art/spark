import React, { useState } from 'react';
import { Experience } from '../types';
import Button from './Button';

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
  onComplete: () => void;
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({ experience, onBack, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'resources'>('guide');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) ? prev.filter(n => n !== stepNumber) : [...prev, stepNumber]
    );
  };

  const progress = Math.round((completedSteps.length / experience.instructions.steps.length) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-200 animate-fade-in-up">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80">
        <img src={experience.imageUrl} alt={experience.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-2xl">
           <div className="flex gap-2 mb-2">
             <span className="bg-primary/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{experience.category}</span>
             <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">{experience.estimated_time}</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold mb-2">{experience.title}</h1>
           <p className="text-white/90 text-sm md:text-base">{experience.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6 md:px-10 sticky top-0 bg-white z-10">
        <button 
          onClick={() => setActiveTab('guide')}
          className={`py-4 px-2 mr-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'guide' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Step-by-Step Guide
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'resources' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Materials & Resources
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-10">
        {activeTab === 'guide' ? (
          <div className="space-y-8">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm mb-6">
               <span className="font-bold">Tip:</span> {experience.instructions.intro}
            </div>

            {/* Steps */}
            <div className="space-y-6">
                {experience.instructions.steps.map((step) => (
                    <div key={step.step} className="flex gap-4 group">
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div 
                                onClick={() => toggleStep(step.step)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 ${
                                    completedSteps.includes(step.step) 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : 'border-gray-300 text-gray-500 group-hover:border-primary'
                                }`}
                            >
                                {completedSteps.includes(step.step) ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <span className="text-sm font-bold">{step.step}</span>
                                )}
                            </div>
                            {step.step !== experience.instructions.steps.length && (
                                <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                            )}
                        </div>
                        <div className="pb-8">
                            <h3 className={`font-bold text-gray-900 text-lg mb-1 ${completedSteps.includes(step.step) ? 'line-through text-gray-400' : ''}`}>{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            {step.tip && (
                                <div className="mt-3 text-xs font-medium text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-lg">
                                    💡 {step.tip}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Completion */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-sm">
                    <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-gray-500 text-sm mb-6">{completedSteps.length} of {experience.instructions.steps.length} steps completed</p>
                <Button size="lg" onClick={onComplete} disabled={progress < 100} className={progress < 100 ? 'opacity-50' : 'animate-bounce'}>
                    Complete Experience 🎉
                </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
             <section>
                <h3 className="font-bold text-gray-900 text-lg mb-4">What You'll Need</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {experience.materials?.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
             </section>

             <section>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Helpful Videos</h3>
                <div className="grid gap-4">
                    {experience.video_links.map((video, i) => (
                        <a key={i} href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all group">
                             <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                             </div>
                             <div>
                                 <h4 className="font-medium text-gray-900">{video.title}</h4>
                                 <p className="text-xs text-gray-500">{video.duration} • YouTube</p>
                             </div>
                        </a>
                    ))}
                </div>
             </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetail;