import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Massagem Relaxante',
    description: 'Alivie o estresse e a tensão com uma massagem profunda e revitalizante.',
    icon: 'MassagemIcon'
  },
  {
    title: 'Drenagem Linfática',
    description: 'Reduza o inchaço, elimine toxinas e melhore a circulação com esta técnica suave.',
    icon: 'DrenagemIcon'
  },
  {
    title: 'Limpeza de Pele Profunda',
    description: 'Renove sua pele, remova impurezas e cravos, deixando-a mais saudável e luminosa.',
    icon: 'PeleIcon'
  }
];

// Simple placeholder icons can be defined here or imported from icons.tsx
const ServiceIcon = ({ type }: { type: string }) => {
    if (type === 'MassagemIcon') return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#795548]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0021 5.5V3.935m-18 0s-1.05.3-1.05 2.5v2.5s0 2.2 1.05 2.5m18-7.5s1.05-.3 1.05-2.5V6.435s0-2.2-1.05-2.5m-18 7.5v2.5s0 2.2 1.05 2.5M12 21a2 2 0 01-2-2v-1a2 2 0 012-2 2 2 0 012 2v1a2 2 0 01-2 2z" /></svg>;
    if (type === 'DrenagemIcon') return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#795548]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    if (type === 'PeleIcon') return <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#795548]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21v-1a6 6 0 006-6v-1a3 3 0 00-3-3H9a3 3 0 00-3 3v1a6 6 0 006 6z" /></svg>;
    return null;
}

export const OtherServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 bg-[#f7f5f2] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Beleza & Bem-Estar</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Cuidados que vão além da estética, promovendo relaxamento e bem-estar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-500">
              <div className="bg-[#edeae6] p-4 rounded-full mb-4">
                  <ServiceIcon type={service.icon} />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#312a27] mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
              <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="mt-4 font-semibold text-[#795548] hover:text-[#6b4a3e]">
                Saber Mais &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};