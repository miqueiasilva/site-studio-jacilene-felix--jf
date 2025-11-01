import React, { useState } from 'react';

const faqs = [
  {
    question: 'Qual a durabilidade da micropigmentação de sobrancelhas?',
    answer: 'A durabilidade varia de 8 a 18 meses, dependendo do tipo de pele, cuidados pós-procedimento e técnica utilizada. Peles oleosas tendem a ter uma durabilidade menor.'
  },
  {
    question: 'O procedimento de micropigmentação dói?',
    answer: 'Utilizamos anestésicos tópicos de alta qualidade para minimizar qualquer desconforto. A maioria das clientes relata uma sensação de leve arranhão, mas o procedimento é geralmente bem tolerado.'
  },
  {
    question: 'Quais são os cuidados necessários após a micropigmentação labial?',
    answer: 'É crucial manter os lábios hidratados, evitar exposição solar direta, alimentos muito quentes ou ácidos nos primeiros dias, e não remover as casquinhas que se formam durante a cicatrização.'
  },
  {
    question: 'O Brow Lamination estraga os fios da sobrancelha?',
    answer: 'Não. Quando realizado por um profissional qualificado e com produtos de qualidade, o Brow Lamination é seguro. Ele age na estrutura do fio para alisá-lo e reposicioná-lo, sem causar danos.'
  },
  {
    question: 'Como funciona a remoção a laser?',
    answer: 'O laser emite pulsos de luz de alta energia que fragmentam o pigmento da tatuagem ou micropigmentação em partículas menores. Essas partículas são então eliminadas pelo sistema imunológico do corpo.'
  },
  {
    question: 'Como posso agendar um horário?',
    answer: 'Você pode agendar seu horário clicando em qualquer botão "Agendar Agora" em nosso site, entrando em contato pelo WhatsApp, ou através da nossa assistente de IA na seção "Laboratório de IA".'
  }
];

// FIX: Explicitly type FAQItem as a React.FC to allow 'key' prop in lists.
const FAQItem: React.FC<{ faq: typeof faqs[0], isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#312a27]"
      >
        <span>{faq.question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600 pr-4">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#edeae6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Perguntas Frequentes</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Tire suas dúvidas mais comuns sobre nossos procedimentos e cuidados.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};