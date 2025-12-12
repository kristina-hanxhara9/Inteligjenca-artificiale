
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceDemos from './components/ServiceDemos';
import UseCases from './components/UseCases';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyView from './components/CaseStudyView';
import LegalView from './components/LegalView';
import { CONTENT } from './constants';
import { Language } from './types';
import Lenis from 'lenis';

type ViewState = 'home' | 'case-study' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('sq'); 
  const [view, setView] = useState<ViewState>('home');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  
  // Use a ref to access the current lenis instance
  const lenisRef = useRef<Lenis | null>(null);

  const content = CONTENT[lang];

  useEffect(() => {
    // Only enable Lenis smooth scroll on non-touch devices or larger screens
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    if (!isMobile) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical', 
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }
  }, []);

  // Global Anchor Click Interceptor
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        e.preventDefault();
        const targetId = href;

        // Special case for Logo/Top
        if (targetId === '#') {
            if (view !== 'home') {
                setView('home');
                setActiveCaseId(null);
                setPendingHash('TOP');
            } else {
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            return;
        }

        // Standard ID navigation
        const element = document.querySelector(targetId);
        if (element) {
            // Element exists (we are likely on Home)
            if (lenisRef.current) {
                lenisRef.current.scrollTo(element);
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Element not found (we are likely on Case Study view)
            setView('home');
            setActiveCaseId(null);
            setPendingHash(targetId);
        }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [view]);

  // Handle Pending Scroll after View Switch
  useEffect(() => {
    if (view === 'home' && pendingHash) {
        // Allow a brief moment for React to mount the Home components
        setTimeout(() => {
            if (pendingHash === 'TOP') {
                if (lenisRef.current) lenisRef.current.scrollTo(0);
                else window.scrollTo({ top: 0 });
            } else {
                const element = document.querySelector(pendingHash);
                if (element) {
                    if (lenisRef.current) lenisRef.current.scrollTo(element);
                    else element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            setPendingHash(null);
        }, 100);
    }
  }, [view, pendingHash]);

  const handleCaseSelection = (id: string) => {
      setActiveCaseId(id);
      setView('case-study');
      window.scrollTo(0, 0);
  };

  const handleLegalSelection = (type: 'privacy' | 'terms') => {
      setView(type);
      window.scrollTo(0, 0);
  }

  const handleBackToHome = () => {
      setView('home');
      setActiveCaseId(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {view === 'home' && (
        <>
          <Navbar lang={lang} setLang={setLang} content={content.nav} />
          <main>
            <Hero content={content.hero} stats={content.stats} />
            <About content={content.about} eduContent={content.education} />
            <Services content={content.services} />
            <UseCases content={content.useCases} onSelectCase={handleCaseSelection} />
            <ServiceDemos content={content.demos} />
            <Contact content={content.contact} />
          </main>
          <Footer content={content.footer} onLinkClick={handleLegalSelection} />
        </>
      )}

      {view === 'case-study' && activeCaseId && content.useCases.details[activeCaseId] && (
            <CaseStudyView 
                data={content.useCases.details[activeCaseId]} 
                onBack={handleBackToHome}
                lang={lang}
                ui={content.nav}
            />
      )}

      {view === 'privacy' && (
          <LegalView type="privacy" onBack={handleBackToHome} />
      )}

      {view === 'terms' && (
          <LegalView type="terms" onBack={handleBackToHome} />
      )}
    </div>
  );
};

export default App;
