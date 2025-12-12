import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Translation } from '../types';
import { MessageCircle, Zap, TrendingUp, Database, Monitor, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  content: Translation['services'];
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  cardsRef.current = [];
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-header", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".service-card", 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  const iconMap: Record<string, React.ReactNode> = {
    "MessageCircle": <MessageCircle size={32} />,
    "Zap": <Zap size={32} />,
    "TrendingUp": <TrendingUp size={32} />,
    "Database": <Database size={32} />,
    "Monitor": <Monitor size={32} />
  };

  return (
    <section id="services" ref={containerRef} className="py-24 px-6 bg-[#FDFBF7] relative z-10 border-t border-neutral-100">
      {/* Qilim Pattern Divider at Top */}
      <div className="absolute top-0 left-0 w-full h-4 pattern-qilim opacity-40"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 service-header opacity-0 translate-y-8"> 
          <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-2 block relative inline-block">
            {content.subtitle}
            {/* Eagle Wing stylized line */}
            <div className="absolute -right-8 top-1/2 w-6 h-[2px] bg-red-600"></div>
            <div className="absolute -left-8 top-1/2 w-6 h-[2px] bg-red-600"></div>
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
            {content.title}
          </h2>
        </div>

        <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((item, idx) => (
            <div 
              key={idx} 
              ref={addToRefs}
              className={`service-card opacity-0 group p-8 rounded-2xl bg-white border border-neutral-100 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] cursor-default relative overflow-hidden ${idx === 0 ? 'lg:col-span-2 bg-gradient-to-br from-white to-red-50/50' : ''}`}
            >
               {/* Subtle motif corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="text-red-600 mb-6 bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm border border-red-100">
                  {item.icon && iconMap[item.icon]}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
                  Learn more <div className="w-8 h-[2px] bg-red-600"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center service-header flex flex-col items-center">
            <p className="text-neutral-400 mb-8 italic max-w-2xl mx-auto font-medium">
              "We don't just sell software. We build the custom intelligence infrastructure that your specific business needs to lead the market."
            </p>
            
            <a href="#contact" className="group bg-red-600 hover:bg-black text-white px-8 py-4 w-full sm:w-auto rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 active:scale-95 duration-200">
               {content.cta}
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Services;