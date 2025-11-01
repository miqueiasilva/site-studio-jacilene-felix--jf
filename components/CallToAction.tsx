
import React from 'react';
import { WhatsAppIcon } from './icons';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Pronta para Realçar sua Beleza Natural?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Agende sua consulta e descubra como podemos transformar seu olhar com naturalidade e sofisticação
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-[#795548] text-[#795548] px-8 py-3 rounded-full hover:bg-[#795548] hover:text-white transition-all duration-300 w-full sm:w-auto">
            Agendar Consulta
          </a>
          <button className="bg-[#795548] text-white px-8 py-3 rounded-full hover:bg-[#6b4a3e] transition-colors duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
            <WhatsAppIcon className="w-5 h-5" />
            <span>WhatsApp IA</span>
          </button>
        </div>
      </div>
    </section>
  );
};