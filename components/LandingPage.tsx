import React from 'react';
import Button from './Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Experience.ai
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900">How it works</a>
            <a href="#" className="hover:text-gray-900">Examples</a>
            <a href="#" className="hover:text-gray-900">Pricing</a>
        </div>
        <Button variant="outline" size="sm" onClick={onStart}>Log In</Button>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in">
             <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide">
                ✨ AI-Powered Discovery
             </div>
             <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Break your routine. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Discover yourself.</span>
             </h1>
             <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Stop scrolling and start doing. Our AI curates a personalized weekly plan of new experiences tailored to your personality and interests.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onStart} className="shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
                    Build My Profile
                </Button>
                <Button variant="outline" size="lg" onClick={onStart}>
                    View Sample Week
                </Button>
             </div>
             <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
                 <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                             <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" />
                        </div>
                    ))}
                 </div>
                 <p>Join 10,000+ explorers today.</p>
             </div>
        </div>

        <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl"></div>
             <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-mono text-gray-400">weekly_plan.json</div>
                </div>
                <div className="p-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={`https://picsum.photos/seed/landing${i}/200/200`} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-24 bg-gray-100 rounded"></div>
                            </div>
                            <div className="ml-auto">
                                <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="bg-gray-50 py-20 px-6">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
                 <p className="text-gray-600 max-w-2xl mx-auto">No forms. No checklists. Just a conversation.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                 {[
                    { icon: "💬", title: "Chat with AI", desc: "Share your interests and constraints in a natural conversation." },
                    { icon: "🎯", title: "Get Matched", desc: "Our engine selects experiences that fit your budget and vibe." },
                    { icon: "📅", title: "Unlock Weekly", desc: "Receive a curated 7-day plan with tutorials and guides." }
                 ].map((feature, i) => (
                     <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                         <div className="text-4xl mb-6">{feature.icon}</div>
                         <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                         <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                     </div>
                 ))}
             </div>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;