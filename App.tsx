import React, { useState, useEffect } from 'react';
import { AppState, UserProfile, WeeklyPackage } from './types';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import ExperienceDetail from './components/ExperienceDetail';
import { MOCK_EXPERIENCES } from './constants';

function App() {
  const [appState, setAppState] = useState<AppState>({
    view: 'landing',
    userProfile: null,
    currentPackage: null,
    selectedExperienceId: null,
  });

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

  const handleStart = () => {
    setAppState(prev => ({ ...prev, view: 'chat' }));
  };

  const handleProfileComplete = (profileData: any) => {
    // Merge generated profile data with default tier
    const profile: UserProfile = {
        ...profileData,
        tier: 'free', // Default to free
        name: 'Explorer' 
    };

    // Generate a mock package based on the new profile
    const newPackage: WeeklyPackage = {
        id: crypto.randomUUID(),
        user_id: profile.id,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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

  const handleUpgrade = () => {
      if (appState.userProfile) {
          const updatedProfile: UserProfile = { ...appState.userProfile, tier: 'premium' };
          localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
          setAppState(prev => ({ ...prev, userProfile: updatedProfile }));
          alert("Welcome to Spark Premium! Your AI mentor is ready.");
      }
  };

  // Find the selected experience from mock data
  const selectedExperience = appState.selectedExperienceId 
    ? MOCK_EXPERIENCES.find(e => e.id === appState.selectedExperienceId) 
    : null;

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
                        Spark
                     </div>
                     <div className="flex items-center gap-4">
                        {appState.userProfile?.tier === 'free' && (
                             <button onClick={handleUpgrade} className="text-sm font-semibold text-primary hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                Upgrade Plan
                             </button>
                        )}
                        <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-500">
                            Log Out
                        </button>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${appState.userProfile?.tier === 'premium' ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md' : 'bg-primary'}`}>
                            {appState.userProfile?.name?.charAt(0) || 'U'}
                        </div>
                     </div>
                </div>
            </nav>
        )}

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
                onUpgrade={handleUpgrade}
            />
        )}

        {appState.view === 'experience_detail' && selectedExperience && (
            <div className="py-8 px-4">
                <ExperienceDetail 
                    experience={selectedExperience}
                    userTier={appState.userProfile?.tier || 'free'}
                    onBack={handleBackToDashboard}
                    onComplete={() => alert('Marked as complete!')}
                />
            </div>
        )}
    </div>
  );
}

export default App;