import React from 'react';
import { EnhancedExperience } from '../types';

interface ExperienceCardProps {
  experience: EnhancedExperience;
  isToday?: boolean;
  isCompleted?: boolean;
  onClick: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isToday, isCompleted, onClick }) => {
  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden flex flex-col h-full
      ${isToday ? 'ring-2 ring-primary border-primary' : 'border-gray-200'}
      ${isCompleted ? 'bg-gray-50 opacity-75' : ''}
      `}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={experience.hero_image} 
          alt={experience.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
             <span className="px-2 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm rounded-full text-gray-700 shadow-sm capitalize">
                {experience.category}
             </span>
        </div>
        {isToday && (
            <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-bold bg-primary text-white rounded-full shadow-sm animate-pulse">
                    Today's Pick
                </span>
            </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{experience.title}</h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{experience.tagline}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {experience.estimated_time.typical}m
                </span>
                <span className="flex items-center gap-1 capitalize">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {experience.difficulty_level.replace('_', ' ')}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;