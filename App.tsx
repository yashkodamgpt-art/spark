import React, { useState, useEffect } from 'react';
import { AppState, UserProfile, WeeklyPackage } from './types';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import ExperienceDetail from './components/ExperienceDetail';
import { MOCK_EXPERIENCES } from './constants';

function App() {
  // Simple State Management for the single-page flow
  const [appState, setAppState] = useState<AppState>({
    view: 'landing',
    userProfile: null,
    currentPackage: null,
    selectedExperienceId: null,
  });

  // Effect to load data from localStorage (Mock persistence)
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    const savedPackage = localStorage.getItem('weekly_package');
    
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setAppState(prev => ({
            ...prev,
            view: 'dashboard',
            userProfile: profile,
            currentPackage: savedPackage ? JSON.parse(savedPackage) : null
        }));
    }
  }, []);

  // Handlers
  const handleStart = () => {
    setAppState(prev => ({ ...prev, view: 'chat' }));
  };

  const handleProfileComplete = (profile: UserProfile) => {
    // Generate a mock package based on the new profile
    const newPackage: WeeklyPackage = {
        id: crypto.randomUUID(),
        user_id: profile.id,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        // Just picking first 7 for demo, in real app AI would select these IDs
        experiences: MOCK_EXPERIENCES.map(e => e.id).slice(0, 7),
        status: 'active'
    };

    localStorage.setItem('user_profile', JSON.stringify(profile));
    localStorage.setItem('weekly_package', JSON.stringify(newPackage));

    setAppState(prev => ({
        ...prev,
        userProfile: profile,
        currentPackage: newPackage,
        view: 'dashboard'
    }));
  };

  const handleSelectExperience = (id: string) => {
    setAppState(prev => ({ ...prev, selectedExperienceId: id, view: 'experience_detail' }));
  };

  const handleBackToDashboard = () => {
    setAppState(prev => ({ ...prev, selectedExperienceId: null, view: 'dashboard' }));
  };

  const handleLogout = () => {
      localStorage.clear();
      setAppState({
          view: 'landing',
          userProfile: null,
          currentPackage: null,
          selectedExperienceId: null
      });
  };

  // View Routing
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Navigation Wrapper for Authenticated Views */}
        {appState.view !== 'landing' && appState.view !== 'chat' && (
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                     <div 
                        className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer"
                        onClick={handleBackToDashboard}
                     >
                        Experience.ai
                     </div>
                     <div className="flex items-center gap-4">
                        <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-500">
                            Log Out
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {appState.userProfile?.name?.charAt(0) || 'U'}
                        </div>
                     </div>
                </div>
            </nav>
        )}

        {/* View Switcher */}
        {appState.view === 'landing' && (
            <LandingPage onStart={handleStart} />
        )}

        {appState.view === 'chat' && (
            <div className="max-w-3xl mx-auto h-screen py-8 px-4">
                <ChatInterface onProfileComplete={handleProfileComplete} />
            </div>
        )}

        {appState.view === 'dashboard' && (
            <Dashboard 
                appState={appState} 
                onSelectExperience={handleSelectExperience}
                onGenerateNewWeek={() => handleProfileComplete(appState.userProfile!)}
            />
        )}

        {appState.view === 'experience_detail' && appState.selectedExperienceId && (
            <div className="py-8 px-4">
                <ExperienceDetail 
                    experience={MOCK_EXPERIENCES.find(e => e.id === appState.selectedExperienceId)!}
                    onBack={handleBackToDashboard}
                    onComplete={() => alert('Marked as complete!')}
                />
            </div>
        )}
    </div>
  );
}

export default App;