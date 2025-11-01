import React, { useEffect, useRef, useState } from 'react';
import { FacialCareIcon, MassageTherapyIcon, EpilationIcon } from './icons';

const professionalServices = [
  {
    category: 'Cuidados Faciais & Corporais',
    professional: 'por Elda Priscila',
    services: ['Limpeza de Pele', 'Peelings', 'Massagens', 'Tratamentos Estéticos'],
    icon: <FacialCareIcon className="h-8 w-8 text-[#795548]" />
  },
  {
    category: 'Fisioterapia & Massoterapia',
    professional: 'por Herlon Gonçalves',
    services: ['Quiropraxia', 'Ventosaterapia', 'Liberação Miofascial', 'Drenagem Linfática'],
    icon: <MassageTherapyIcon className="h-8 w-8 text-[#795548]" />
  },
  {
    category: 'Epilação Profissional',
    professional: 'por Gleizia Santos',
    services: ['Epilação Feminina', 'Epilação Masculina', 'Cuidados com a Pele'],
    icon: <EpilationIcon className="h-8 w-8 text-[#795548]" />
  }
];

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
            Cuidados que vão além da estética, promovendo relaxamento e bem-estar com nossos especialistas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {professionalServices.map((profService, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-500">
              <div className="bg-[#edeae6] p-4 rounded-full mb-4">
                  {profService.icon}
              </div>
              <h3 className="text-xl font-bold font-serif text-[#312a27] mb-1">{profService.category}</h3>
              <p className="text-sm text-gray-500 mb-4">{profService.professional}</p>
              <ul className="text-gray-600 text-sm list-none p-0 mb-4 flex-grow">
                {profService.services.map(service => <li key={service} className="mb-1">{service}</li>)}
              </ul>
              <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="mt-auto font-semibold text-[#795548] hover:text-[#6b4a3e]">
                Agendar &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
