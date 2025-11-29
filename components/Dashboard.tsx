import React from 'react';
import { AppState, EnhancedExperience } from '../types';
import ExperienceCard from './ExperienceCard';
import { MOCK_EXPERIENCES } from '../constants';
import Button from './Button';

interface DashboardProps {
  appState: AppState;
  onSelectExperience: (id: string) => void;
  onGenerateNewWeek: () => void;
  onUpgrade: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ appState, onSelectExperience, onGenerateNewWeek, onUpgrade }) => {
  const { userProfile, currentPackage } = appState;

  if (!currentPackage || !userProfile) {
      return (
          <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800">No active journey.</h2>
              <button onClick={onGenerateNewWeek} className="mt-4 text-primary underline">Generate one now</button>
          </div>
      )
  }

  // Helper to get full experience details from IDs in the package
  const weekExperiences = currentPackage.experiences.map(id => MOCK_EXPERIENCES.find(e => e.id === id)).filter(Boolean) as EnhancedExperience[];
  
  // Assume day 0 is today for demo
  const todayIndex = 0; 
  const todayExperience = weekExperiences[todayIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 animate-fade-in">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userProfile.name || 'Traveler'}!</h1>
           <div className="flex items-center gap-2 mt-1">
             <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${userProfile.tier === 'premium' ? 'bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'}`}>
                {userProfile.tier} Plan
             </span>
             <p className="text-gray-500">
               Interests: <span className="font-medium text-primary">{userProfile.personality_data.traits.slice(0, 3).join(', ')}</span>
             </p>
           </div>
        </div>
        <div className="text-right flex items-center gap-4">
            {userProfile.tier === 'free' && (
                <Button variant="primary" size="sm" onClick={onUpgrade} className="shadow-lg shadow-blue-200 animate-pulse">
                    Upgrade to Premium
                </Button>
            )}
            <div className="hidden md:block">
                <p className="text-sm text-gray-500">Current Week</p>
                <p className="font-medium text-gray-900">{new Date(currentPackage.start_date).toLocaleDateString()} - {new Date(currentPackage.end_date).toLocaleDateString()}</p>
            </div>
        </div>
      </div>

      {/* Today's Highlight */}
      <section className="animate-fade-in-up">
        <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-accent rounded-full"></span>
            <h2 className="text-2xl font-bold text-gray-800">Today's Adventure</h2>
        </div>
        <div className="h-full">
            {todayExperience ? (
                <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <div className="order-2 md:order-1 flex flex-col justify-center space-y-4">
                         <div className="flex gap-2">
                             <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Day {todayIndex + 1}</span>
                             <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">{todayExperience.estimated_time.typical}m</span>
                         </div>
                         <h3 className="text-3xl font-bold text-gray-900">{todayExperience.title}</h3>
                         <p className="text-gray-600 text-lg leading-relaxed">{todayExperience.tagline}</p>
                         <p className="text-gray-500 text-sm line-clamp-2">{todayExperience.description}</p>
                         <div className="pt-4">
                             <button 
                                onClick={() => onSelectExperience(todayExperience.id)}
                                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                             >
                                Start Experience
                             </button>
                         </div>
                     </div>
                     <div className="order-1 md:order-2 h-64 md:h-auto rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => onSelectExperience(todayExperience.id)}>
                         <img src={todayExperience.hero_image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Today" />
                         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                     </div>
                </div>
            ) : (
                <div className="p-8 bg-gray-50 rounded-xl text-center">Rest day! Or click generate to refresh.</div>
            )}
        </div>
      </section>

      {/* Weekly Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <span className="w-2 h-8 bg-secondary rounded-full"></span>
                <h2 className="text-2xl font-bold text-gray-800">Your Weekly Plan</h2>
            </div>
            <button className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">View Full Calendar</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {weekExperiences.map((exp, index) => {
                const isToday = index === todayIndex;
                const isPast = index < todayIndex;
                const date = new Date();
                date.setDate(date.getDate() + index);

                return (
                    <div key={exp.id} className="relative">
                        <div className="absolute -top-3 left-4 z-10 bg-white shadow-sm border border-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <ExperienceCard 
                            experience={exp} 
                            isToday={isToday}
                            isCompleted={isPast}
                            onClick={() => onSelectExperience(exp.id)}
                        />
                    </div>
                );
            })}
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-sm p-6 text-white flex flex-col justify-center items-center text-center">
                 <div className="text-4xl mb-2">🎁</div>
                 <h3 className="font-bold text-lg mb-1">Weekly Bonus</h3>
                 <p className="text-indigo-100 text-sm">Complete 5 activities to unlock a special reward!</p>
             </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;