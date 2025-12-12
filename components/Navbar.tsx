
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Translation } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  content: Translation['nav'];
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'sq' : 'en');
  };

  const navLinkClass = "text-sm font-medium hover:text-red-600 transition-colors cursor-pointer text-[#1a1a1a] font-inter tracking-wide";
  const mobileLinkClass = "text-3xl font-bold text-[#1a1a1a] hover:text-red-600 transition-colors font-space-grotesk tracking-tight w-full text-center py-2";

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled || isOpen 
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md py-4 border-neutral-200 shadow-sm' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
          {/* Logo */}
          <a href="#" onClick={() => setIsOpen(false)} className="flex items-center gap-2 font-bold text-2xl tracking-tighter group">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-bold">IA</span>
            </div>
            <span className="text-[#1a1a1a] uppercase text-sm md:text-base tracking-tight hidden sm:block">INTELIGJENCA ARTIFICIALE</span>
            <span className="text-[#1a1a1a] uppercase text-sm md:text-base tracking-tight sm:hidden">INTELIGJENCA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className={navLinkClass}>{content.home}</a>
            <a href="#about" className={navLinkClass}>{content.about}</a>
            <a href="#services" className={navLinkClass}>{content.services}</a>
            <a href="#use-cases" className={navLinkClass}>{content.useCases}</a>
            <a href="#contact" className={navLinkClass}>{content.contact}</a>
            
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-1 text-xs border border-neutral-300 text-neutral-700 px-3 py-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Globe size={14} />
              {lang === 'en' ? 'EN' : 'AL'}
            </button>

            <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold text-sm transition-all shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.4)] active:scale-95">
              {content.bookBtn}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleLang} 
              className="text-neutral-700 font-bold text-sm border border-neutral-200 h-10 px-3 rounded-md flex items-center justify-center active:bg-neutral-100 transition-colors"
            >
               {lang === 'en' ? 'EN' : 'AL'}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#1a1a1a] w-10 h-10 flex items-center justify-center active:scale-90 transition-transform bg-white/50 rounded-md"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#FDFBF7]/98 backdrop-blur-xl z-40 flex flex-col pt-24 pb-8 px-6 transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible'
        }`}
      >
          {/* Menu Items */}
          <div className="flex flex-col gap-6 items-center justify-center flex-1 w-full">
             <a href="#hero" onClick={() => setIsOpen(false)} className={mobileLinkClass}>{content.home}</a>
             <a href="#about" onClick={() => setIsOpen(false)} className={mobileLinkClass}>{content.about}</a>
             <a href="#services" onClick={() => setIsOpen(false)} className={mobileLinkClass}>{content.services}</a>
             <a href="#use-cases" onClick={() => setIsOpen(false)} className={mobileLinkClass}>{content.useCases}</a>
             <a href="#contact" onClick={() => setIsOpen(false)} className={mobileLinkClass}>{content.contact}</a>
          </div>

          {/* Bottom Action */}
          <div className="w-full mt-auto space-y-6">
            {/* Decoration */}
            <div className="w-full h-[1px] bg-neutral-200"></div>
            
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)} 
              className="block w-full text-center bg-red-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-transform"
            >
              {content.bookBtn}
            </a>
            
            <p className="text-center text-xs text-neutral-400 uppercase tracking-widest">
              Inteligjenca Artificiale • Future of Business
            </p>
          </div>
      </div>
    </>
  );
};

export default Navbar;
