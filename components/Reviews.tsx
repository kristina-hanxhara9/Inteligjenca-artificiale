
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Translation } from '../types';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ReviewsProps {
  content: Translation['reviews'];
}

const Reviews: React.FC<ReviewsProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.from(".review-card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
              trigger: ".review-grid",
              start: "top 80%"
          }
       });
    }, containerRef);
    return () => ctx.revert();
  }, [content]);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[#FDFBF7] relative overflow-hidden border-t border-neutral-100">
       {/* Background Watermark - Abstract Eagle */}
       <div className="absolute right-0 bottom-0 w-[600px] h-[600px] eagle-watermark opacity-5 pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm">{content?.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mt-2">{content?.title}</h2>
        </div>

        <div className="review-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {content?.items?.map((item, idx) => (
                <div key={idx} className="review-card bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 relative group hover:-translate-y-2 transition-transform duration-300">
                    <div className="absolute top-6 right-6 text-red-600/20 group-hover:text-red-600/40 transition-colors">
                        <Quote size={40} />
                    </div>
                    
                    <p className="text-neutral-600 mb-8 leading-relaxed relative z-10 italic">
                        "{item.text}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center font-bold text-red-600 border border-neutral-200">
                            {item.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-[#1a1a1a]">{item.name}</div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wide">{item.role}, {item.company}</div>
                        </div>
                    </div>
                    
                    {/* Bottom Red Line */}
                    <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
