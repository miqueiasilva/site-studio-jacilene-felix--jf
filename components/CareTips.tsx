
import React, { useState, useEffect } from 'react';
import { PreProcedureIcon, ShieldCheckIcon, MaintenanceIcon } from './icons';

const tipDetailsData = {
  pre: {
    title: 'Cuidados Pré-Procedimento',
    content: [
      { heading: '24 Horas Antes', text: 'Evite bebidas alcoólicas, cafeína e medicamentos anticoagulantes (como aspirina) para reduzir o risco de sangramento e sensibilidade.' },
      { heading: 'No Dia do Procedimento', text: 'Não utilize maquiagem na área a ser pigmentada. A pele deve estar completamente limpa e livre de produtos para garantir a melhor absorção do pigmento.' },
      { heading: 'Pele Saudável', text: 'Evite exposição solar intensa, peelings químicos ou tratamentos faciais agressivos na semana anterior para garantir que a pele esteja em ótimas condições.' },
      { heading: 'Hidratação', text: 'Beba bastante água e mantenha a pele bem hidratada nos dias que antecedem a sessão para um melhor resultado.' },
    ]
  },
  post: {
    title: 'Pós-Cuidados Essenciais',
    content: [
      { heading: 'Primeiras 48 Horas', text: 'Limpe a área suavemente com um algodão umedecido em água filtrada a cada 2-3 horas. Após a limpeza, aplique uma fina camada da pomada cicatrizante recomendada.' },
      { heading: 'Primeiros 7-10 Dias', text: 'Evite molhar a área (piscinas, saunas, mar), exposição solar direta, maquiagem na região e atividades físicas intensas que causem suor excessivo.' },
      { heading: 'Processo de Cicatrização', text: 'É normal sentir uma leve coceira e ver a formação de casquinhas finas. É crucial NÃO coçar, esfregar ou remover as casquinhas; deixe-as cair naturalmente.' },
      { heading: 'Evolução da Cor', text: 'A cor parecerá mais escura e intensa nos primeiros dias, mas clareará até 40% durante a cicatrização. O resultado final e definitivo aparece após 30 dias.' },
    ]
  },
  maintenance: {
    title: 'Manutenção e Retoque',
    content: [
      { heading: 'Primeiro Retoque', text: 'O retoque é essencial para um resultado perfeito e duradouro. Deve ser feito entre 30 e 45 dias após o procedimento inicial para corrigir possíveis falhas e intensificar a cor.' },
      { heading: 'Proteção Solar', text: 'Após a cicatrização completa, use protetor solar (FPS 50+) diariamente na área micropigmentada para evitar o desbotamento precoce da cor.' },
      { heading: 'Cuidados a Longo Prazo', text: 'Evite o uso de ácidos, peelings e lasers diretamente sobre a área pigmentada, pois eles podem acelerar o desbotamento.' },
      { heading: 'Manutenção Anual', text: 'Recomenda-se uma sessão de manutenção anual ou a cada 18 meses para manter a cor, o design e a definição sempre vibrantes.' },
    ]
  }
};

const tips = [
  {
    id: 'pre',
    icon: <PreProcedureIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Cuidados Pré-Procedimento',
    description: 'Saiba como se preparar adequadamente para sua sessão de micropigmentação.',
    details: tipDetailsData.pre
  },
  {
    id: 'post',
    icon: <ShieldCheckIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Pós-Cuidados Essenciais',
    description: 'Dicas importantes para garantir a melhor cicatrização e durabilidade.',
    details: tipDetailsData.post
  },
  {
    id: 'maintenance',
    icon: <MaintenanceIcon className="w-10 h-10 text-[#795548]" />,
    title: 'Manutenção e Retoque',
    description: 'Como manter seus resultados sempre perfeitos com os cuidados adequados.',
    details: tipDetailsData.maintenance
  }
];

const CareTipModal: React.FC<{ isOpen: boolean; onClose: () => void; tip: typeof tipDetailsData.pre | null }> = ({ isOpen, onClose, tip }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
         onClose();
       }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tip) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-serif text-[#312a27]">{tip.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <main className="p-6 max-h-[70vh] overflow-y-auto">
          <ul className="space-y-4">
            {tip.content.map((item, index) => (
              <li key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                <h4 className="font-bold text-[#312a27] mb-1">{item.heading}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </main>
        <footer className="p-4 bg-gray-50 border-t text-right">
          <button onClick={onClose} className="bg-[#795548] text-white px-6 py-2 rounded-lg hover:bg-[#6b4a3e] transition-colors duration-300">
            Entendido
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};


export const CareTips: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState<typeof tipDetailsData.pre | null>(null);

  const openModal = (tipDetails: typeof tipDetailsData.pre) => {
    setSelectedTip(tipDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTip(null);
  };

  return (
    <>
      <section className="py-20 bg-[#edeae6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Dicas de Cuidados</h2>
            <p className="max-w-3xl mx-auto text-gray-600">
              Maximize e mantenha seus resultados com nossas dicas de especialistas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tips.map((tip) => (
              <div key={tip.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
                <div className="mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{tip.description}</p>
                <button onClick={() => openModal(tip.details)} className="font-semibold text-[#795548] hover:text-[#6b4a3e] transition-colors duration-300 mt-auto">
                  Ler mais &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CareTipModal isOpen={isModalOpen} onClose={closeModal} tip={selectedTip} />
    </>
  );
};
