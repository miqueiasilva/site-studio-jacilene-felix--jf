import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// Lazy load components for code-splitting and faster initial load
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Team = lazy(() => import('./components/Team').then(module => ({ default: module.Team })));
const Results = lazy(() => import('./components/Results').then(module => ({ default: module.Results })));
const CareTips = lazy(() => import('./components/CareTips').then(module => ({ default: module.CareTips })));
const FAQ = lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const CallToAction = lazy(() => import('./components/CallToAction').then(module => ({ default: module.CallToAction })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

const LoadingFallback = () => (
  <div className="flex justify-center items-center py-20 min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#795548]"></div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = {
    home: useRef<HTMLDivElement>(null),
    servicos: useRef<HTMLDivElement>(null),
    profissionais: useRef<HTMLDivElement>(null),
    resultados: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    contato: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sections) => {
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sectionEntries = Object.entries(sections);
    
    sectionEntries.forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.id = key;
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionElements = sectionEntries.map(([, ref]) => ref.current).filter(Boolean);
    
    sectionElements.forEach(el => observer.observe(el!));

    return () => {
      sectionElements.forEach(el => observer.unobserve(el!));
    };
  }, []);

  return (
    <div className="bg-[#f7f5f2] text-[#312a27]">
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <main>
        <div ref={sections.home}>
          <Hero />
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <div ref={sections.servicos}>
            <Services />
          </div>
          <div ref={sections.profissionais}>
            <Team />
          </div>
          <div ref={sections.resultados}>
            <Results />
          </div>
          <CareTips />
          <div ref={sections.faq}>
            <FAQ />
          </div>
          <CallToAction />
          <div ref={sections.contato}>
            <Contact />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}