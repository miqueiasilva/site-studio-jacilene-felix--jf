
import React from 'react';
import { PreProcedureIcon, PostCareIcon, MaintenanceIcon } from './icons';

const tips = [
  {
    icon: <PreProcedureIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Cuidados Pré-Procedimento',
    description: 'Saiba como se preparar adequadamente para sua sessão de micropigmentação.'
  },
  {
    icon: <PostCareIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Pós-Cuidados Essenciais',
    description: 'Dicas importantes para garantir a melhor cicatrização e durabilidade.'
  },
  {
    icon: <MaintenanceIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Manutenção e Retoque',
    description: 'Como manter seus resultados sempre perfeitos com os cuidados adequados.'
  }
];

export const CareTips: React.FC = () => {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Dicas de Cuidados</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Maximize e mantenha seus resultados com nossas dicas de especialistas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
              <div className="mb-4">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{tip.description}</p>
              <a href="#" className="font-semibold text-[#795548] hover:text-[#6b4a3e] transition-colors duration-300 mt-auto">
                Ler mais &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};