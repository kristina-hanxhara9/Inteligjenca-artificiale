
import React, { useEffect, useRef } from 'react';
import { CaseStudyDetails, Translation } from '../types';
import { ArrowLeft, CircuitBoard } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveSimulation from './LiveSimulation';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyViewProps {
  data: CaseStudyDetails;
  onBack: () => void;
  lang: string;
  ui: Translation['nav'];
}

const CaseStudyView: React.FC<CaseStudyViewProps> = ({ data, onBack, lang, ui }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();
      tl.from(".cs-hero-text", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
        .from(".cs-stat-box", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out" }, "-=0.4");

      // Process Steps Animation
      gsap.from(".cs-step", {
        scrollTrigger: {
            trigger: ".cs-process",
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
      });
      
      // Connect line animation
      gsap.from(".cs-line", {
          height: 0,
          scrollTrigger: {
              trigger: ".cs-process",
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1
          }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFBF7] relative z-40 pb-20">
      {/* Navigation Bar Override */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-red-600 transition-colors group"
              >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  {ui.backBtn}
              </button>
              <div className="flex items-center gap-2 font-bold text-lg">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white text-xs">IA</div>
                <span className="text-[#1a1a1a] uppercase text-sm tracking-tight">INTELIGJENCA ARTIFICIALE</span>
              </div>
          </div>
      </nav>

      {/* Hero Section */}
      <header className={`relative pt-32 pb-20 px-6 overflow-hidden bg-black text-white`}>
         <div className={`absolute inset-0 bg-${data.heroImage} opacity-40`}></div>
         <div className="absolute inset-0 pattern-qilim opacity-10"></div>
         
         <div className="max-w-5xl mx-auto relative z-10 text-center">
            <span className="cs-hero-text inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-white/5 backdrop-blur-sm">
                Case Study • {data.clientType}
            </span>
            <h1 className="cs-hero-text text-4xl md:text-6xl font-bold mb-6 leading-tight">{data.title}</h1>
            
            {/* Results Grid Hero */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 border-t border-white/10 pt-12 max-w-4xl mx-auto">
                {data.results.map((res, idx) => (
                    <div key={idx} className="cs-stat-box text-center">
                        <div className="text-3xl md:text-5xl font-bold text-red-500 mb-2">{res.value}</div>
                        <div className="text-xs md:text-sm text-neutral-400 uppercase tracking-wide">{res.label}</div>
                    </div>
                ))}
            </div>
         </div>
      </header>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         
         {/* Live Simulation for Tourism/Hotel Case Study */}
         {data.id === 'tourism' && (
             <div className="animate-[fadeIn_1s_ease-out]">
                 <div className="text-center mb-6">
                     <span className="text-red-600 font-bold uppercase text-xs tracking-widest">Real-Time Core View</span>
                     <h2 className="text-2xl font-bold mt-2">See The System In Action</h2>
                 </div>
                 <LiveSimulation />
             </div>
         )}

         {/* Problem / Solution */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><ArrowLeft size={100} /></div>
                 <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4">The Challenge</h2>
                 <h3 className="text-2xl font-bold mb-4">{data.problem.title}</h3>
                 <p className="text-neutral-600 leading-relaxed">{data.problem.desc}</p>
             </div>
             
             <div className="bg-[#1a1a1a] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                 <div className="absolute inset-0 pattern-eagle-wing opacity-10"></div>
                 <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">The AI Solution</h2>
                 <h3 className="text-2xl font-bold mb-4">{data.solution.title}</h3>
                 <p className="text-neutral-400 leading-relaxed">{data.solution.desc}</p>
             </div>
         </div>

         {/* Process Timeline */}
         <div className="cs-process relative">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold">How It Works</h2>
             </div>

             <div className="relative max-w-2xl mx-auto pl-8 md:pl-0">
                 {/* Connecting Line */}
                 <div className="cs-line absolute left-3 md:left-1/2 top-0 w-[2px] bg-red-600 h-full -ml-[1px] opacity-20"></div>

                 {data.solution.steps.map((step, idx) => (
                     <div key={idx} className={`cs-step relative mb-16 last:mb-0 md:flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}>
                         
                         {/* Center Node */}
                         <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FDFBF7] border-4 border-red-600 rounded-full z-10 flex items-center justify-center">
                             <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                         </div>

                         {/* Content Card */}
                         <div className={`ml-10 md:ml-0 md:w-[45%] bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:border-red-600 transition-colors ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                             <div className={`flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                 <CircuitBoard size={16} className="text-red-600" />
                                 <span className="text-xs font-bold text-neutral-400 uppercase">Step 0{idx + 1}</span>
                             </div>
                             <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                             <p className="text-sm text-neutral-600">{step.desc}</p>
                         </div>
                         
                         {/* Spacer for other side */}
                         <div className="hidden md:block md:w-[45%]"></div>
                     </div>
                 ))}
             </div>
         </div>

         {/* Final CTA */}
         <div className="bg-red-600 text-white p-12 rounded-3xl text-center relative overflow-hidden">
             <div className="absolute inset-0 pattern-qilim opacity-20 mix-blend-overlay"></div>
             <div className="relative z-10">
                 <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready for similar results?</h2>
                 <a href="#contact" className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all shadow-lg">
                     Book Your Consultation
                 </a>
             </div>
         </div>

      </div>
    </div>
  );
};

export default CaseStudyView;
