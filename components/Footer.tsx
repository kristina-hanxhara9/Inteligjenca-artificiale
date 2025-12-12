
import React from 'react';
import { Translation } from '../types';
import { Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';

interface FooterProps {
  content: Translation['footer'];
  onLinkClick?: (view: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ content, onLinkClick }) => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t border-red-900 relative overflow-hidden">
      {/* Top Border - Folk Zigzag */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiNkYzI2MjYiLz48L3N2Zz4=')] bg-repeat-x bg-[length:20px_10px] opacity-50"></div>
      
      {/* 
          Grid Layout Optimization:
          - Mobile (Default): grid-cols-2. Brand and Contact span 2 cols. Links span 1 col each (side-by-side).
          - Tablet (md): grid-cols-2. 
          - Desktop (lg): grid-cols-4.
      */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16 relative z-10">
        
        {/* Column 1: Brand (Full width on mobile to give space) */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-6">
           <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center shadow-lg shadow-red-600/20">
                <span className="text-white text-xs font-bold">IA</span>
              </div>
              <span className="text-white uppercase text-sm tracking-tight">INTELIGJENCA ARTIFICIALE</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              {content.tagline}
            </p>
            <div className="flex gap-4">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors text-white"><Instagram size={18} /></a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors text-white"><Linkedin size={18} /></a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors text-white"><Twitter size={18} /></a>
            </div>
        </div>

        {/* Column 2: Company (1 col on mobile) */}
        <div className="col-span-1">
            <h4 className="font-bold text-lg mb-6 border-l-4 border-red-600 pl-3">{content.columns.company}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
                <li><a href="#about" className="hover:text-white hover:translate-x-1 transition-all inline-block py-1">{content.links.about}</a></li>
                <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-all inline-block py-1">{content.links.services}</a></li>
                <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-all inline-block py-1">{content.links.services}</a></li>
            </ul>
        </div>

        {/* Column 3: Legal (1 col on mobile) */}
        <div className="col-span-1">
            <h4 className="font-bold text-lg mb-6 border-l-4 border-red-600 pl-3">{content.columns.legal}</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
                <li>
                  <button 
                    onClick={() => onLinkClick?.('privacy')} 
                    className="hover:text-white hover:translate-x-1 transition-all inline-block py-1 text-left"
                  >
                    Politika e Privatësisë
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onLinkClick?.('terms')} 
                    className="hover:text-white hover:translate-x-1 transition-all inline-block py-1 text-left"
                  >
                    Kushtet e Përdorimit
                  </button>
                </li>
            </ul>
        </div>

        {/* Column 4: Contact/Map Hint (Full width on mobile for better visibility) */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
             <h4 className="font-bold text-lg mb-6 border-l-4 border-red-600 pl-3">Locations</h4>
             <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-red-600/30 transition-colors group">
                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🇬🇧</span>
                        <p className="text-white font-bold text-sm">London, United Kingdom</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🇦🇱</span>
                        <p className="text-white font-bold text-sm">Tirana, Albania</p>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-white/10 my-3"></div>
                <p className="text-neutral-400 text-xs mb-1">Email</p>
                <a href="mailto:kristinazhi97@gmail.com" className="text-red-500 text-sm font-bold block hover:underline">kristinazhi97@gmail.com</a>
             </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-900 text-center text-neutral-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
         <p>© {new Date().getFullYear()} Inteligjenca Artificiale. {content.rights}</p>
         <p className="opacity-50">Global Design. Built for Tirana.</p>
      </div>

      {/* Decorative Eagle Wing Overlay */}
      <div className="absolute right-0 bottom-0 w-64 h-64 pattern-eagle-wing opacity-10 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
