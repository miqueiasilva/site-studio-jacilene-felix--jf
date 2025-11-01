import React from 'react';
import { WhatsAppIcon } from './icons';

const ORIGINAL_HERO_IMAGE_URL = 'https://i.ibb.co/XrtcD83R/Untitled-design-1.png';
const HERO_IMAGE_URL = `https://images.weserv.nl/?url=${encodeURIComponent(ORIGINAL_HERO_IMAGE_URL)}&w=1920&q=80&output=webp`;

export const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-screen overflow-hidden flex items-center justify-center text-white"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-serif mb-4 leading-tight text-[#f7f5f2] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Beleza Natural <br /> com <span className="italic">Elegância</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          Especialistas em micropigmentação e tratamentos estéticos que realçam sua beleza natural com técnicas avançadas e atendimento premium.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="bg-[#795548] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#6b4a3e] hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out w-full sm:w-auto">
            Agendar Agora
          </a>
          <button className="bg-white/5 border border-gray-300 text-white px-8 py-3 rounded-full backdrop-blur-sm hover:bg-white/20 hover:border-white hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out flex items-center justify-center gap-2 w-full sm:w-auto">
            <WhatsAppIcon className="w-5 h-5" />
            <span>Falar com a IA no WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};