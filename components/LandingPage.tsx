import React from 'react';
import Button from './Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Spark
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-gray-900">How it works</button>
            <button onClick={() => scrollToSection('examples')} className="hover:text-gray-900">Examples</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-gray-900">Pricing</button>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ignite your Spark.</span>
             </h1>
             <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Stop scrolling and start doing. Discover personalized weekly experiences tailored to your interests.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onStart} className="shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
                    Build My Profile
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('examples')}>
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
                    <div className="text-xs font-mono text-gray-400">weekly_spark.json</div>
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
      <section id="how-it-works" className="bg-gray-50 py-20 px-6">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
                 <p className="text-gray-600 max-w-2xl mx-auto">No checklists. Just a guided journey.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                 {[
                    { icon: "💬", title: "Chat with Spark", desc: "Share your interests and constraints in a natural conversation." },
                    { icon: "🎯", title: "Get Matched", desc: "Our engine selects experiences that fit your budget and vibe." },
                    { icon: "🧭", title: "Guided Journey", desc: "Interactive step-by-step guides with an AI mentor." }
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

      {/* Examples Section */}
      <section id="examples" className="py-20 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">What will you discover?</h2>
             <p className="text-gray-600">From 10-minute skills to weekend projects.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-6">
             {["Learn to Juggle", "Build an App", "Make Sourdough"].map((title, i) => (
                 <div key={i} className="group relative rounded-xl overflow-hidden h-64 shadow-lg cursor-pointer">
                     <img src={`https://picsum.photos/seed/example${i}/400/600`} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                         <h3 className="text-white text-xl font-bold">{title}</h3>
                     </div>
                 </div>
             ))}
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-900 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
                  <p className="text-gray-400 max-w-xl mx-auto">Start for free with simple checklists, or upgrade to Spark Premium for a personal AI mentor who guides you every step of the way.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Free Plan */}
                  <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 flex flex-col">
                      <div className="mb-4">
                          <h3 className="text-2xl font-bold">Spark Free</h3>
                          <div className="text-4xl font-bold mt-2">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                      </div>
                      <p className="text-gray-400 mb-8">Perfect for self-starters who just need great ideas.</p>
                      
                      <ul className="space-y-4 mb-8 flex-1">
                          <li className="flex gap-3 text-gray-300">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              1 Weekly Experience Package
                          </li>
                          <li className="flex gap-3 text-gray-300">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Standard Checklist Guides
                          </li>
                          <li className="flex gap-3 text-gray-300">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Basic Progress Tracking
                          </li>
                      </ul>
                      
                      <Button variant="outline" className="w-full bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={onStart}>
                          Start Free
                      </Button>
                  </div>

                  {/* Paid Plan */}
                  <div className="bg-gradient-to-b from-primary to-blue-800 rounded-2xl p-8 border border-blue-500 shadow-2xl shadow-blue-900/50 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                      <div className="mb-4">
                          <h3 className="text-2xl font-bold text-white">Spark Premium</h3>
                          <div className="text-4xl font-bold mt-2 text-white">$9<span className="text-lg text-blue-200 font-normal">/mo</span></div>
                      </div>
                      <p className="text-blue-100 mb-8">For those who want a mentor, not just a list.</p>
                      
                      <ul className="space-y-4 mb-8 flex-1">
                          <li className="flex gap-3 text-white">
                              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Unlimited Experience Packages
                          </li>
                          <li className="flex gap-3 text-white">
                              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              <strong>AI Mentor Guidance</strong> (Interactive)
                          </li>
                          <li className="flex gap-3 text-white">
                              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Real-time Q&A Help
                          </li>
                          <li className="flex gap-3 text-white">
                              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Adaptive Step-by-Step Mode
                          </li>
                      </ul>
                      
                      <Button variant="primary" className="w-full bg-white text-primary hover:bg-gray-100 border-none" onClick={onStart}>
                          Get Premium
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-500 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="text-xl font-bold text-white mb-4 md:mb-0">Spark</div>
              <div className="flex gap-6 text-sm">
                  <a href="#" className="hover:text-white">Privacy</a>
                  <a href="#" className="hover:text-white">Terms</a>
                  <a href="#" className="hover:text-white">Contact</a>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;