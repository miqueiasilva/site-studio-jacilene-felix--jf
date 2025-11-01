import React, { useRef, useEffect, useState } from 'react';
import { FaceIcon, SpaIcon, FeatherIcon, CheckIcon } from './icons';

const facialServices = [
  'Limpeza de Pele Premium',
  'Limpeza de Pele com Peeling',
  'Avaliação + Rotina de Skincare',
  'Massagem Relaxante Facial',
  'Remoção de Sinais',
  'Peeling para Clareamento de Manchas',
  'Peeling para Acne e Melasma',
];

const bodyServices = [
  'Quiropraxia',
  'Ventosaterapia',
  'Liberação Miofascial',
  'Massagem Desportiva',
  'Massagem Terapêutica',
  'Massagem Quick',
  'Drenagem Linfática',
  'Reflexologia Podal',
];

const epilationServices = [
  'Epilação Feminina (Cera)',
  'Epilação Masculina (Cera)',
  'Epilação Facial (Linha)',
  'Hidratação Corporal Pós-Epilação',
];

const ServiceColumn: React.FC<{ title: string; services: string[]; icon: React.ReactNode; index: number; isVisible: boolean }> = ({ title, services, icon, index, isVisible }) => {
  return (
    <div 
      className={`bg-white p-8 rounded-lg shadow-lg flex flex-col transition-all duration-500 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex-shrink-0 w-16 h-16 bg-[#795548]/10 text-[#795548] rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-serif mb-4 text-[#312a27]">{title}</h3>
      <ul className="space-y-3 text-gray-600 flex-grow">
        {services.map((service, i) => (
          <li key={i} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-[#795548] mr-2 flex-shrink-0 mt-0.5" />
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


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
    <section ref={sectionRef} className="py-20 bg-[#edeae6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Beleza & Bem-Estar</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Explore nossos cuidados essenciais para uma experiência completa de renovação, oferecidos por nossos especialistas dedicados.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceColumn 
            title="Estética Facial" 
            services={facialServices} 
            icon={<FaceIcon className="w-8 h-8"/>}
            index={0}
            isVisible={isVisible}
          />
          <ServiceColumn 
            title="Terapias Corporais" 
            services={bodyServices} 
            icon={<SpaIcon className="w-8 h-8"/>}
            index={1}
            isVisible={isVisible}
          />
          <ServiceColumn 
            title="Epilação Profissional" 
            services={epilationServices} 
            icon={<FeatherIcon className="w-8 h-8"/>}
            index={2}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
};
