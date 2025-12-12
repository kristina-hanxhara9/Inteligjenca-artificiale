
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Translation } from '../types';
import { GraduationCap, Briefcase, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  content: Translation['about'];
  eduContent: Translation['education'];
}

const About: React.FC<AboutProps> = ({ content, eduContent }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const icons = [<GraduationCap size={28} />, <Briefcase size={28} />, <Globe size={28} />];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-[#FDFBF7] relative overflow-hidden border-t border-neutral-100">
      
      {/* Decorative Traditional Element - Stylized Plis (Hat) curve */}
      <div className="absolute top-0 right-0 w-[50%] h-full opacity-5 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current text-neutral-400">
              <path d="M40,-50 C50,-40 60,-20 60,0 C60,20 50,40 40,50 C30,60 10,70 -10,70 C-30,70 -50,60 -60,40 C-70,20 -70,0 -60,-20 C-50,-40 -30,-60 -10,-60 C10,-60 30,-50 40,-50 Z" transform="translate(100 100)" />
           </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Personal Brand */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
            <span className="block text-red-600 text-lg uppercase tracking-widest mb-2 font-sans font-semibold border-b-2 border-red-600 inline-block pb-1">Profile</span>
            {content.title}
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed font-light">
            {content.description}
          </p>
          
          <div className="grid gap-6 mt-8">
            {content.cards.map((card, idx) => (
              <div key={idx} className="about-card flex items-start gap-4 p-5 border-l-4 border-red-600 bg-white rounded-r-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 pattern-qilim opacity-10 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="text-red-600 mt-1 relative z-10">{icons[idx]}</div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{card.title}</h3>
                  <p className="text-neutral-500 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Education/Market Context - Dark Contrast */}
        <div className="bg-black p-8 md:p-12 rounded-3xl border border-neutral-800 relative about-card shadow-2xl text-white overflow-hidden">
           {/* Decorative big letter */}
           <div className="absolute -top-6 -right-6 text-9xl font-bold text-white/5 select-none">AI</div>
           
           {/* Qilim pattern overlay for dark card */}
           <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-black pattern-qilim opacity-50"></div>

           <h3 className="text-3xl font-bold mb-6 text-white relative z-10">{eduContent.title}</h3>
           <p className="text-neutral-300 mb-8 relative z-10 leading-relaxed">{eduContent.desc}</p>
           
           <ul className="space-y-4 relative z-10">
             {eduContent.points.map((point, idx) => (
               <li key={idx} className="flex items-center gap-3 text-neutral-200">
                 <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white shadow-lg shadow-red-600/50">
                   {idx + 1}
                 </span>
                 {point}
               </li>
             ))}
           </ul>

           <div className="mt-10 pt-8 border-t border-neutral-800 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center overflow-hidden border border-neutral-700">
                   <span className="font-bold text-xs text-white">{eduContent.credentialCode}</span>
                </div>
                <div>
                  <p className="font-bold text-white">MSc Data Science & AI</p>
                  <p className="text-sm text-neutral-400">{eduContent.credentialLabel}</p>
                </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;
