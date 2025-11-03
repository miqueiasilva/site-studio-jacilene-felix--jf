import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon } from './icons';

const services = [
  {
    title: 'Micropigmentação de Sobrancelhas',
    subtitle: 'Técnica Fio a Fio',
    description: 'Técnica que desenha fios realistas, criando sobrancelhas naturais e simétricas.',
    tags: ['Fio a Fio', 'Magic Shadow', 'Técnica Híbrida'],
    duration: '2-3 horas',
    price: 'R$ 549,90',
    installments: '12x de R$ 49,90',
    image: 'https://i.ibb.co/1fMpFR4m/Imagem-do-Whats-App-de-2024-01-26-s-17-06-51-65d1cea3-Copia.jpg',
    imagePosition: 'object-[center_30%]'
  },
  {
    title: 'Micropigmentação de Lábios',
    subtitle: 'Realce Natural',
    description: 'Realça a cor natural dos lábios com neutralização e implantação de cor.',
    tags: ['Neutralização', 'Implantação de Cor', 'Retoque Incluído'],
    duration: '2-3 horas',
    price: 'R$ 599,90',
    installments: '12x de R$ 54,90',
    image: 'https://i.ibb.co/WW5282HM/camera-Roll-Temp-Image-6.jpg'
  },
  {
    title: 'Brow Lamination',
    subtitle: 'Sobrancelhas Alinhadas',
    description: 'Alinha e fixa os fios das sobrancelhas para um look mais definido.',
    tags: ['Alinhamento', 'Fixação', 'Durabilidade'],
    duration: '1 hora',
    price: 'R$ 140,00',
    installments: 'Com tintura inclusa',
    image: 'https://i.ibb.co/WLRjLzN/ee4544495cd8267c.png'
  },
   {
    title: 'Evolution Skin',
    subtitle: 'Pele Renovada',
    description: 'Tratamento avançado para vasos e rejuvenescimento da pele com tecnologia de ponta.',
    tags: ['Rejuvenescimento', 'Vasos', 'Pele Lisa'],
    duration: '1-2 horas',
    price: 'a partir de R$ 250,00',
    installments: 'Por sessão',
    image: 'https://i.ibb.co/5WqdHtF4/Tratamento-de-estria-1024x642.png'
  },
  {
    title: 'Remoção',
    subtitle: 'Correção Segura',
    description: 'Remoção a laser segura e eficaz de micropigmentação e tatuagens com resultados visíveis.',
    tags: ['Laser', 'Segurança', 'Resultados'],
    duration: '30-60 min',
    price: 'a partir de R$ 100,00',
    installments: 'Micropigmentação: a partir de R$ 250,00',
    image: 'https://i.ibb.co/7NC8WzMG/remocao-de-tattoo-8413548c19ec1cde9117056770673418-1024-1024.jpg'
  }
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const optimizedImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(service.image)}&w=600&q=80&output=webp`;

  return (
    <div 
      ref={cardRef} 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-500 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <img src={optimizedImageUrl} alt={service.title} className={`w-full h-56 object-cover ${'imagePosition' in service ? service.imagePosition : 'object-center'}`} loading="lazy" />
        <div className="absolute top-3 right-3 bg-white/80 rounded-full p-2 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#312a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-serif">{service.title}</h3>
        <p className="text-[#a1887f] text-sm mb-2">{service.subtitle}</p>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <ClockIcon className="w-4 h-4 mr-2" />
          <span>Duração: {service.duration}</span>
        </div>
        <div className="mb-6">
          <p className="text-3xl font-bold text-[#312a27]">{service.price}</p>
          <p className="text-sm text-gray-500">{service.installments}</p>
        </div>
        <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-[#795548] text-white py-3 rounded-lg hover:bg-[#6b4a3e] transition-colors duration-300 font-semibold">
          Agendar Consulta
        </a>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Nossos Serviços</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Oferecemos tratamentos especializados em beleza e estética com técnicas modernas e resultados naturais
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};