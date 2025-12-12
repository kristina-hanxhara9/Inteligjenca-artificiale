
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Translation } from '../types';
import { Briefcase, Building, ShoppingBag, Landmark, Activity, ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface UseCasesProps {
  content: Translation['useCases'];
  onSelectCase: (id: string) => void;
}

const icons = [<Building size={32} />, <Briefcase size={32} />, <ShoppingBag size={32} />, <Landmark size={32} />, <Activity size={32} />];

const UseCases: React.FC<UseCasesProps> = ({ content, onSelectCase }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Enable horizontal scrolling with mouse wheel (Standard mapping for horizontal lists)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // If content is wider than container (overflow exists)
      if (container.scrollWidth > container.clientWidth) {
        // If scrolling vertically (deltaY), map it to horizontal
        // Only prevent default if we aren't at the edges, or just map it regardless for "pinned" feel
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
           container.scrollLeft += e.deltaY;
           e.preventDefault();
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section id="use-cases" className="py-16 md:py-24 bg-black text-white overflow-hidden relative border-t border-neutral-800">
       {/* Background Motif - Dark Qilim */}
       <div className="absolute inset-0 pattern-qilim opacity-5 bg-fixed"></div>
       
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <span className="text-red-600 font-bold tracking-widest uppercase text-sm block mb-2">{content.subtitle}</span>
                <h2 className="text-3xl md:text-5xl font-bold">{content.title}</h2>
            </div>
            
            {/* Scroll Hint */}
            <div className="flex items-center gap-2 text-neutral-500 text-sm animate-pulse">
                <span>Scroll or Swipe</span>
                <ArrowRight size={16} />
            </div>
        </div>
      </div>

      {/* 
          Container behavior: 
          - Horizontal Scroll
          - Snap Scrolling
          - Hide Scrollbar
      */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-4 md:gap-8 px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2))] 
                   overflow-x-auto snap-x snap-mandatory 
                   w-full
                   pb-12 scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: 'smooth' }}
      >
        {content.cases.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onSelectCase(item.id)}
            className="use-case-card snap-center shrink-0 
                       w-[85vw] sm:w-[60vw] md:w-[400px]
                       bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl relative group hover:border-red-600 transition-colors duration-500 flex flex-col justify-between
                       min-h-[450px] cursor-pointer"
          >
             {/* Decorative Number */}
             <div className="absolute top-4 right-6 text-5xl md:text-6xl font-bold text-white/5 group-hover:text-red-600/10 transition-colors">0{idx + 1}</div>
             
             <div>
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-xl flex items-center justify-center text-red-500 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(220,38,38,0.0)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    {icons[idx]}
                 </div>

                 <div className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 border-l-2 border-red-600 pl-3">{item.category}</div>
                 <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-red-500 transition-colors">{item.title}</h3>
                 <p className="text-sm md:text-base text-neutral-400 mb-6 md:mb-8 leading-relaxed line-clamp-4">{item.desc}</p>
             </div>
             
             <div className="border-t border-white/10 pt-4 flex items-center justify-between mt-auto group-hover:border-red-600/30 transition-colors">
                <span className="text-xs md:text-sm text-neutral-500 group-hover:text-white transition-colors">View Case Study</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Plus size={16} />
                </div>
             </div>
          </div>
        ))}
        {/* Spacer for mobile scroll end */}
        <div className="shrink-0 w-8"></div>
      </div>
    </section>
  );
};

export default UseCases;
