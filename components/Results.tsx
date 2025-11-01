import React, { useState, useEffect, useRef } from 'react';

const results = [
  {
    title: 'Micropigmentação Natural',
    description: 'Resultado natural e harmonioso que realça a beleza única de cada cliente.',
    image: 'https://i.ibb.co/Jj7xNLVR/IMG-3657.jpg'
  },
  {
    title: 'Limpeza de Pele Profunda',
    description: 'Pele limpa, renovada e livre de impurezas.',
    image: 'https://i.ibb.co/8HGFZ61/Whats-App-Image-2025-10-25-at-17-54-32.jpg'
  },
  {
    title: 'Lábios Revitalizados',
    description: 'Cor e contorno definidos para um sorriso mais confiante.',
    image: 'https://i.ibb.co/V06WSrCR/Imagem-do-Whats-App-de-2024-01-24-s-13-22-48-92d5d196-Copia.jpg'
  },
  {
    title: 'Sobrancelhas Perfeitas',
    description: 'Design que valoriza o olhar e a expressão facial.',
    image: 'https://i.ibb.co/60FGLBZz/IMG-3876.jpg'
  },
  {
    title: 'Remoção Bem-sucedida',
    description: 'Pele renovada e pronta para um novo procedimento.',
    image: 'https://i.ibb.co/NdB61zJF/Whats-App-Image-2025-10-31-at-22-19-03.jpg'
  }
];

const ResultCard = ({ result }: { result: typeof results[0] }) => {
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
  
  const optimizedImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(result.image)}&w=800&q=80&output=webp`;

  return (
    <div ref={cardRef} className={`group rounded-lg overflow-hidden relative transition-all duration-500 fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <img src={optimizedImageUrl} alt={result.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-xl font-bold font-serif">{result.title}</h3>
        <p className="text-gray-200 text-sm">{result.description}</p>
      </div>
    </div>
  );
};

export const Results: React.FC = () => {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Resultados Reais</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Veja a transformação de nossas clientes e inspire-se com resultados naturais e duradouros.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-2 h-full">
            <ResultCard result={results[0]} />
          </div>
          <div className="lg:col-span-2 h-full">
            <ResultCard result={results[1]} />
          </div>
          <div className="lg:col-span-2 h-full">
            <ResultCard result={results[2]} />
          </div>
          <div className="lg:col-span-3 h-full">
            <ResultCard result={results[3]} />
          </div>
          <div className="lg:col-span-3 h-full">
            <ResultCard result={results[4]} />
          </div>
        </div>
      </div>
    </section>
  );
};