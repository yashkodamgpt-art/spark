import React, { useState } from 'react';
import { EnhancedExperience } from '../types';

interface SimpleStepListProps {
  experience: EnhancedExperience;
  onComplete: () => void;
  onBack: () => void;
}

const SimpleStepList: React.FC<SimpleStepListProps> = ({ experience, onComplete, onBack }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const allStepsCount = experience.phases.reduce((acc, phase) => acc + phase.steps.length, 0);
  const progress = Math.round((completedSteps.size / allStepsCount) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
        <div>
           <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-900 mb-1">← Back to Overview</button>
           <h2 className="text-xl font-bold text-gray-900">{experience.title}</h2>
        </div>
        <div className="text-right">
           <div className="text-sm font-medium text-gray-600">{progress}% Complete</div>
           <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {experience.phases.map((phase, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
             <div className="bg-gray-50 p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Phase {phase.phase_number}: {phase.title}</h3>
                <p className="text-sm text-gray-500">{phase.description}</p>
             </div>
             <div className="divide-y divide-gray-50">
                {phase.steps.map((step) => (
                  <div key={step.id} className="p-4 hover:bg-gray-50 transition-colors">
                     <label className="flex items-start gap-4 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                          checked={completedSteps.has(step.id)}
                          onChange={() => toggleStep(step.id)}
                        />
                        <div className="flex-1">
                           <div className="font-medium text-gray-900">{step.title}</div>
                           <p className="text-gray-600 text-sm mt-1">{step.instruction}</p>
                           {step.image_url && (
                             <img src={step.image_url} alt={step.title} className="mt-2 rounded-lg w-full max-w-xs object-cover h-32" />
                           )}
                           <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded inline-block">
                              Tip: {step.tips[0] || "Take your time!"}
                           </div>
                        </div>
                     </label>
                  </div>
                ))}
             </div>
          </div>
        ))}

        <div className="flex justify-center pt-8">
            <button
                onClick={onComplete}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
            >
                🎉 Complete Experience
            </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleStepList;