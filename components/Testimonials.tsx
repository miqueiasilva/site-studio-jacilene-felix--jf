import React, { useState, useEffect } from 'react';

const staticTestimonials = [
  {
    name: 'Ana Clara',
    service: 'Micropigmentação Fio a Fio',
    text: 'O trabalho da Jacilene foi transformador! Minhas sobrancelhas ficaram perfeitas, super naturais. O cuidado e o profissionalismo de toda a equipe são incríveis. Recomendo de olhos fechados!'
  },
  {
    name: 'Fernanda Lima',
    service: 'Brow Lamination',
    text: 'Estou apaixonada pelo resultado do Brow Lamination! Deixou meu olhar mais expressivo e as sobrancelhas super alinhadas. O ambiente do studio é maravilhoso e o atendimento impecável.'
  },
  {
    name: 'Juliana Paes',
    service: 'Micropigmentação Labial',
    text: 'Amei o resultado! Meus lábios ficaram com uma cor linda e super natural. A equipe é muito atenciosa e o procedimento foi bem tranquilo. Com certeza voltarei!'
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % staticTestimonials.length);
    }, 7000); // Change testimonial every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + staticTestimonials.length) % staticTestimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % staticTestimonials.length);
  };
  
  const currentTestimonial = staticTestimonials[currentIndex];

  return (
    <section className="py-20 bg-[#edeae6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">O que Nossas Clientes Dizem</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Depoimentos reais que refletem a qualidade e o carinho do nosso trabalho.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden min-h-[300px] flex items-center">
          <div className="w-full">
            <p className="text-xl md:text-2xl italic text-gray-700 leading-relaxed text-center transition-opacity duration-500">
              "{currentTestimonial.text}"
            </p>
            <div className="mt-6 text-center">
              <p className="font-bold text-lg text-[#312a27]">{currentTestimonial.name}</p>
              <p className="text-sm text-gray-500">Cliente de {currentTestimonial.service}</p>
            </div>
          </div>
           <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a1887f]">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#312a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a1887f]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#312a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};