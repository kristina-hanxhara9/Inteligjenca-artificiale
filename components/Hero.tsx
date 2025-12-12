import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Translation } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import EagleNetwork from './EagleNetwork';

interface HeroProps {
  content: Translation['hero'];
  stats: Translation['stats'];
}

const Hero: React.FC<HeroProps> = ({ content, stats }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-stat", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.8
      });
      gsap.from(".eagle-container", {
        opacity: 0,
        scale: 0.8,
        rotation: 10,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, [content]);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-12 px-6 max-w-7xl mx-auto z-10 overflow-hidden bg-[#FDFBF7]">
        {/* Ancient Illyrian Spiral Background - Rotating Slow */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] pattern-illyrian-spiral opacity-5 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
        
        {/* Right side Xhubleta motifs */}
        <div className="absolute right-0 top-1/4 flex flex-col gap-3 opacity-10 pointer-events-none">
             {[...Array(8)].map((_, i) => (
                 <div key={i} className="w-12 h-12 border-r-4 border-b-4 border-red-600 rotate-45"></div>
             ))}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center w-full h-full relative z-10">
        
        {/* Left Column: Text */}
        <div className="space-y-6 md:space-y-8 z-20 relative order-1">
          
          <div className="hero-text inline-flex items-center gap-3 border-l-4 border-red-600 pl-4 py-1">
            <span className="text-red-700 font-bold tracking-widest uppercase text-xs md:text-sm">{content.badge}</span>
          </div>

          <h1 className="hero-text text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-[#1a1a1a]">
            {content.headline}
          </h1>

          <p className="hero-text text-base sm:text-lg md:text-xl text-neutral-600 max-w-lg leading-relaxed">
            {content.subheadline}
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a href="#contact" className="group bg-black text-white px-8 py-4 md:py-5 w-full sm:w-auto rounded-none skew-x-[-10deg] hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden inline-flex items-center justify-center text-sm md:text-base active:scale-95 duration-200">
              <div className="absolute inset-0 pattern-eagle-wing opacity-20"></div>
              <span className="relative z-10 flex items-center gap-3 skew-x-[10deg] font-bold tracking-wide">
                {content.ctaPrimary}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href="#use-cases" className="group px-8 py-4 md:py-5 w-full sm:w-auto rounded-none skew-x-[-10deg] font-bold text-[#1a1a1a] border-2 border-black hover:bg-neutral-100 flex items-center justify-center gap-2 transition-all text-sm md:text-base active:scale-95 duration-200">
              <span className="skew-x-[10deg] flex items-center gap-2">
                 {content.ctaSecondary}
              </span>
            </a>
          </div>

          {/* Standards / Tech Leaders - New Section */}
          <div className="hero-text pt-8 border-t border-neutral-200 mt-8">
             <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
               {content.techText}
             </p>
             <div className="flex flex-wrap gap-x-6 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center">
                 <span className="font-bold text-lg md:text-xl text-neutral-800 tracking-tight flex items-center gap-1">
                   <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
                 </span>
                 <span className="font-bold text-lg md:text-xl text-neutral-800 tracking-tight flex items-center gap-1">
                    amazon
                    <div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full mt-2"></div>
                 </span>
                 <span className="font-bold text-lg md:text-xl text-neutral-800 tracking-tight">Microsoft</span>
                 <span className="font-bold text-lg md:text-xl text-neutral-800 tracking-tight">OpenAI</span>
             </div>
          </div>
        </div>

        {/* Right Column: The Cyber-Eagle */}
        <div className="eagle-container relative h-[40vh] lg:h-[700px] w-full flex items-center justify-center z-30 order-2 lg:order-2 pointer-events-none lg:pointer-events-auto">
            {/* Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-[60px] md:blur-[100px]"></div>
            
            <div className="w-full h-full relative cursor-move">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#DC2626" />
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <EagleNetwork />
                    </Float>
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#DC2626" />
                    <OrbitControls 
                        enableZoom={false} 
                        enablePan={false} 
                        autoRotate={true}
                        autoRotateSpeed={0.8}
                        rotateSpeed={0.4}
                    />
                </Canvas>
            </div>
            
            {/* Overlay Label */}
            <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 bg-white/80 backdrop-blur border border-red-600/20 p-3 lg:p-4 rounded-lg hidden md:block">
                <div className="text-[10px] lg:text-xs font-bold text-red-600 uppercase tracking-widest mb-1">System Status</div>
                <div className="text-xs lg:text-sm font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    AI Neural Network: Active
                </div>
            </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
          <ChevronDown size={32} className="text-red-600" />
      </div>

    </section>
  );
};

export default Hero;