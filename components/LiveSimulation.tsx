
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { MessageSquare, Terminal, CheckCircle2, MapPin, Calendar, Globe, Cpu, Wifi } from 'lucide-react';

const LiveSimulation = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot', time: string, isLocation?: boolean}>>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Script for the simulation
  const script = [
    { type: 'user', text: "Përshëndetje, a keni dhomë për këtë fundjavë?", time: "10:23 AM", delay: 1000 },
    { type: 'log', text: ">> Incoming Message Detected (WhatsApp)", color: "text-blue-400", delay: 1500 },
    { type: 'log', text: ">> NLP Analysis: Intent [Check_Availability] | Entity [Weekend]", color: "text-yellow-400", delay: 2000 },
    { type: 'log', text: ">> Querying Booking.com API...", color: "text-purple-400", delay: 2500 },
    { type: 'log', text: ">> Status: 2 Double Rooms Available", color: "text-green-400", delay: 3000 },
    { type: 'bot', text: "Po, kemi 2 dhoma dyshe të lira për të Shtunën. Çmimi është 45€/natë me mëngjes.", time: "10:23 AM", delay: 3500 },
    { type: 'user', text: "Në rregull, po e marr një.", time: "10:24 AM", delay: 5000 },
    { type: 'log', text: ">> NLP Analysis: Intent [Booking_Confirm]", color: "text-yellow-400", delay: 5500 },
    { type: 'log', text: ">> Locking Calendar Slot [ID: 8824]...", color: "text-red-400", delay: 6000 },
    { type: 'log', text: ">> Triggering Google Maps API...", color: "text-blue-400", delay: 6500 },
    { type: 'bot', text: "E konfirmuar! ✅ Ja vendndodhja e Vilës Falo dhe parkimi. Shihemi të Shtunën!", time: "10:24 AM", isLocation: true, delay: 7000 },
  ];

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    
    // Reset function to clear state and restart
    const runSimulation = () => {
      setMessages([]);
      setLogs([]);
      
      let currentTime = 0;
      
      script.forEach((step) => {
        const id = setTimeout(() => {
          if (step.type === 'log') {
            setLogs(prev => [...prev.slice(-6), step.text as string]); // Keep last 7 logs
          } else {
            setMessages(prev => [...prev, { 
                text: step.text as string, 
                sender: step.type as 'user' | 'bot', 
                time: step.time as string,
                isLocation: step.isLocation 
            }]);
          }
        }, currentTime + step.delay);
        timeoutIds.push(id);
      });
      
      // Loop the simulation
      const loopId = setTimeout(runSimulation, 15000); 
      timeoutIds.push(loopId);
    };

    runSimulation();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#111] rounded-3xl border border-neutral-800 p-4 md:p-8 overflow-hidden relative shadow-2xl my-12">
       {/* Header */}
       <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
           <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-white font-mono font-bold tracking-wider">LIVE SYSTEM CORE</span>
           </div>
           <div className="flex gap-4 text-xs font-mono text-neutral-500">
               <div className="flex items-center gap-1"><Cpu size={14} /> CPU: 12%</div>
               <div className="flex items-center gap-1"><Wifi size={14} /> NET: 45ms</div>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
           
           {/* Left: User Interface (Phone View) */}
           <div className="bg-white rounded-[2rem] border-8 border-neutral-800 shadow-xl overflow-hidden h-[400px] relative flex flex-col">
               {/* Phone Notch */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-xl z-20"></div>
               
               {/* Phone Header */}
               <div className="bg-[#075E54] text-white p-4 pt-8 flex items-center gap-3">
                   <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">VF</div>
                   <div>
                       <div className="text-sm font-bold">Vila Falo</div>
                       <div className="text-[10px] opacity-80">Online</div>
                   </div>
               </div>
               
               {/* Chat Area */}
               <div className="flex-1 bg-[#E5DDD5] p-4 overflow-y-auto flex flex-col gap-3">
                   {messages.map((msg, i) => (
                       <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
                           <div className={`max-w-[80%] p-2 px-3 rounded-lg text-xs md:text-sm shadow-sm relative ${
                               msg.sender === 'user' ? 'bg-[#DCF8C6] text-black' : 'bg-white text-black'
                           }`}>
                               {msg.text}
                               {/* Location Attachment Simulation */}
                               {msg.isLocation && (
                                   <div className="mt-2 bg-neutral-100 rounded p-2 flex items-center gap-2 border border-neutral-200">
                                       <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-500"><MapPin size={16}/></div>
                                       <span className="text-[10px] font-bold text-blue-600">Google Maps Pin</span>
                                   </div>
                               )}
                               <div className="text-[9px] text-gray-500 text-right mt-1 flex items-center justify-end gap-1">
                                   {msg.time} <CheckCircle2 size={10} className="text-blue-500" />
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>

           {/* Right: System Terminal (Brain) */}
           <div className="bg-[#0c0c0c] rounded-xl border border-neutral-800 p-4 font-mono text-xs md:text-sm h-[400px] overflow-hidden flex flex-col relative">
               <div className="absolute top-2 right-4 text-neutral-600 text-[10px]">v2.4.1-stable</div>
               <div className="text-neutral-500 mb-4 flex items-center gap-2 border-b border-neutral-800 pb-2">
                   <Terminal size={14} />
                   <span>/var/log/ai-core/stream.log</span>
               </div>
               
               <div className="flex-1 overflow-y-auto space-y-2 font-mono">
                   {logs.map((log, i) => (
                       <div key={i} className={`${log.includes('error') ? 'text-red-500' : 'text-green-400'} animate-[slideIn_0.2s_ease-out]`}>
                           <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                           <span className={log.includes('User') ? 'text-white' : 'text-green-400'}>{log}</span>
                       </div>
                   ))}
                   <div className="w-2 h-4 bg-green-500 animate-pulse inline-block align-middle ml-1"></div>
               </div>

               {/* Active Modules Grid */}
               <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-3 gap-2">
                   <div className="bg-neutral-900 p-2 rounded flex flex-col items-center justify-center gap-1 border border-neutral-800">
                       <Globe size={16} className="text-blue-500" />
                       <span className="text-[9px] text-neutral-400">NLP EN/SQ</span>
                   </div>
                   <div className="bg-neutral-900 p-2 rounded flex flex-col items-center justify-center gap-1 border border-neutral-800">
                       <Calendar size={16} className="text-yellow-500" />
                       <span className="text-[9px] text-neutral-400">SYNC ON</span>
                   </div>
                   <div className="bg-neutral-900 p-2 rounded flex flex-col items-center justify-center gap-1 border border-neutral-800">
                       <MapPin size={16} className="text-red-500" />
                       <span className="text-[9px] text-neutral-400">GEO LOC</span>
                   </div>
               </div>
           </div>

       </div>
    </div>
  );
};

export default LiveSimulation;
