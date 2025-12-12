
import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Bot, Zap, Calendar, Bell, TrendingUp, FileCheck, CheckCircle } from 'lucide-react';
import { Translation } from '../types';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDemosProps {
  content: Translation['demos'];
}

// Bypass SVG intrinsic element check
const ThreeLine = 'line' as any;

// "Digital Loom" Background Effect - Weaving Threads
const DigitalLoom = () => {
    const lines = useMemo(() => {
        const l = [];
        const count = 30;
        for(let i=0; i<count; i++) {
            l.push({
                start: new THREE.Vector3((Math.random()-0.5)*20, (Math.random()-0.5)*10, -5),
                speed: Math.random() * 0.02 + 0.01,
                offset: Math.random() * Math.PI * 2
            });
        }
        return l;
    }, []);

    // Use an array of refs instead of relying on children traversal
    const linesRef = useRef<(THREE.Line | null)[]>([]);
    
    // Shared geometry for the lines
    const lineGeo = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5,0,0), new THREE.Vector3(5,0,0)]);
    }, []);

    useFrame((state) => {
        linesRef.current.forEach((mesh, i) => {
            const line = lines[i];
            if (line && mesh) {
                // Safely update position and rotation on the mutable Three.js object
                mesh.position.y = Math.sin(state.clock.elapsedTime * line.speed + line.offset) * 2;
                const rotZ = Math.cos(state.clock.elapsedTime * line.speed) * 0.2;
                mesh.rotation.set(0, 0, rotZ);
            }
        });
    });

    return (
        <group>
            {lines.map((l, i) => (
                <ThreeLine 
                    key={i}
                    ref={(el: THREE.Line) => { linesRef.current[i] = el; }}
                    geometry={lineGeo}
                    // Initial position
                    position={[l.start.x, l.start.y, 0]}
                    scale={[2, 1, 1]}
                >
                    <lineBasicMaterial color={i % 2 === 0 ? "#DC2626" : "#E5E5E5"} transparent opacity={0.1} />
                </ThreeLine>
            ))}
        </group>
    );
};

const ServiceDemos: React.FC<ServiceDemosProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Simple fade up for cards
        gsap.from(".demo-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%"
            }
        });

        // Calendar Animation
        gsap.to(".calendar-day-active", {
            backgroundColor: "#10B981",
            color: "#ffffff",
            duration: 0.5,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".demo-booking",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Notification Pop
        gsap.fromTo(".booking-notification", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 1, ease: "back.out", scrollTrigger: { trigger: ".demo-booking" }}
        );

    }, containerRef);
    return () => ctx.revert();
  }, [content]);

  return (
    <section id="demos" ref={containerRef} className="py-16 md:py-24 px-6 bg-[#FDFBF7] overflow-hidden relative border-t border-neutral-100">
        
        {/* Background Digital Loom Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Canvas camera={{position: [0,0,10]}}>
                <DigitalLoom />
            </Canvas>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-red-600 font-bold tracking-widest uppercase text-sm">{content.subtitle}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mt-2">{content.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 1. Smart Assistant (Replaces Chatbot) */}
                <div className="demo-card demo-chatbot bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-lg flex flex-col min-h-[350px] h-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-red-50 rounded-lg text-red-600"><Bot size={24} /></div>
                        <h3 className="text-xl font-bold">{content.smartAgent.title}</h3>
                    </div>
                    <div className="flex-1 bg-[#F9F9F9] rounded-xl p-4 border border-neutral-100 relative overflow-hidden flex flex-col items-center justify-center gap-4 min-h-[180px]">
                         <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl animate-pulse">
                             <Bot size={32} />
                         </div>
                         <div className="text-center">
                             <div className="font-bold text-lg text-[#1a1a1a]">{content.smartAgent.stats}</div>
                             <div className="text-xs text-neutral-500">{content.smartAgent.systemLabel}</div>
                         </div>
                         <div className="flex gap-2">
                             <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-[10px] text-neutral-600">Whatsapp</span>
                             <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-[10px] text-neutral-600">Web</span>
                             <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-[10px] text-neutral-600">Email</span>
                         </div>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500">{content.smartAgent.desc}</p>
                </div>

                {/* 2. Automation */}
                <div className="demo-card demo-automation bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-lg flex flex-col min-h-[350px] h-auto">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Zap size={24} /></div>
                        <h3 className="text-xl font-bold">{content.automation.title}</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative min-h-[180px]">
                         {/* Automation Pipeline Graphic */}
                         <div className="flex items-center gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 border border-neutral-200 text-xs font-bold">DM</div>
                            <div className="h-[2px] w-6 md:w-8 bg-neutral-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-red-600 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 rounded-lg flex items-center justify-center text-white shadow-lg"><Zap size={18} /></div>
                             <div className="h-[2px] w-6 md:w-8 bg-neutral-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-red-600 -translate-x-full animate-[shimmer_2s_infinite_0.5s]"></div>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 border border-green-100"><FileCheck size={18} /></div>
                         </div>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500">{content.automation.desc}</p>
                </div>

                {/* 3. Booking */}
                <div className="demo-card demo-booking bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-lg flex flex-col min-h-[350px] h-auto">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><Calendar size={24} /></div>
                        <h3 className="text-xl font-bold">{content.booking.title}</h3>
                    </div>
                    <div className="flex-1 bg-[#F9F9F9] rounded-xl p-4 border border-neutral-100 relative min-h-[180px]">
                         <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] text-center text-neutral-400">
                            <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                         </div>
                         <div className="grid grid-cols-7 gap-1 text-center">
                            {[...Array(14)].map((_, i) => (
                                <div key={i} className={`calendar-day-active text-[10px] md:text-xs py-1 rounded ${i === 4 || i === 8 ? 'bg-neutral-100' : 'bg-neutral-200'}`}>
                                    {i + 1}
                                </div>
                            ))}
                         </div>
                         
                         {/* Notification Popover */}
                         <div className="booking-notification absolute bottom-4 left-4 right-4 bg-white border border-neutral-200 p-3 rounded-lg shadow-lg flex items-center gap-3">
                             <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0"><Bell size={14} /></div>
                             <div className="text-xs">
                                 <div className="font-bold text-[#1a1a1a]">AI Agent</div>
                                 <div className="text-neutral-500 truncate">{content.booking.notification}</div>
                             </div>
                         </div>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500">{content.booking.desc}</p>
                </div>

                {/* 4. Growth */}
                <div className="demo-card demo-growth bg-black text-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col min-h-[350px] h-auto relative overflow-hidden">
                    <div className="absolute inset-0 pattern-qilim opacity-10"></div>
                     <div className="flex items-center gap-2 mb-6 relative z-10">
                        <div className="p-2 bg-white/10 rounded-lg text-white"><TrendingUp size={24} /></div>
                        <h3 className="text-xl font-bold">{content.growth.title}</h3>
                    </div>
                    <div className="flex-1 flex items-end gap-2 relative z-10 px-4 min-h-[180px]">
                         <div className="w-full bg-neutral-800 h-[30%] rounded-t"></div>
                         <div className="w-full bg-neutral-700 h-[50%] rounded-t"></div>
                         <div className="w-full bg-neutral-600 h-[40%] rounded-t"></div>
                         <div className="w-full bg-red-600 h-[85%] rounded-t relative shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500">AI</div>
                         </div>
                    </div>
                    <p className="mt-4 text-sm text-neutral-400 relative z-10">{content.growth.desc}</p>
                </div>

            </div>
        </div>
    </section>
  );
};

export default ServiceDemos;
