import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon } from './icons';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  specialties: string[];
  experience: string;
  image: string;
  imagePosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Jacilene Félix',
    role: 'Proprietária & Especialista em Micropigmentação',
    description: 'Especialista em micropigmentação com mais de 8 anos de experiência, dedicada a realçar a beleza natural de cada cliente.',
    specialties: ['Micropigmentação', 'Sobrancelhas', 'Lábios'],
    experience: '8+ anos',
    image: 'https://i.ibb.co/XrtcD83R/Untitled-design-1.png'
  },
  {
    name: 'Jéssica Félix',
    role: 'Lash Designer & Expert em Remoção a Laser',
    description: 'Especialista em design de cílios e remoção segura de tatuagens e micropigmentação com técnicas avançadas a laser.',
    specialties: ['Lash Designer', 'Remoção de Tatuagem a Laser', 'Remoção de Micropigmentação'],
    experience: '5+ anos',
    image: 'https://i.ibb.co/3mX5cFqd/Imagem-do-Whats-App-de-2023-08-24-s-14-29-18.jpg',
    imagePosition: 'object-[center_20%]'
  },
  {
    name: 'Elda Priscila',
    role: 'Farmacêutica Esteta & Cosmetóloga',
    description: 'Farmacêutica especializada em estética e cosmetologia, oferecendo tratamentos faciais e corporais personalizados.',
    specialties: ['Limpeza de Pele', 'Peelings', 'Massagem'],
    experience: '6+ anos',
    image: 'https://i.ibb.co/9Hyyq2xZ/46f4b01373ad67cd28c4d18de7671b9d.webp',
    imagePosition: 'object-top'
  },
  {
    name: 'Graziela Oliveira',
    role: 'Designer de Sobrancelhas & Secretária',
    description: 'Especialista em design de sobrancelhas com olhar atento aos detalhes e excelente atendimento ao cliente.',
    specialties: ['Design de Sobrancelhas', 'Atendimento ao Cliente', 'Agendamentos'],
    experience: '4+ anos',
    image: 'https://i.ibb.co/hRG0ZQyt/2f43093c085b29f55aedd936f13156f7.webp',
    imagePosition: 'object-[center_20%]'
  },
  {
    name: 'Herlon Gonçalves',
    role: 'Fisioterapeuta & Massoterapeuta',
    description: 'Profissional com formação nacional e internacional em massoterapia, também atuando na fisioterapia com foco em reabilitação.',
    specialties: ['Quiropraxia', 'Ventosaterapia', 'Liberação Miofascial', 'Massagem Desportiva', 'Massagem Terapêutica', 'Massagem Quick', 'Massagem Thai', 'Drenagem Linfática', 'Reflexologia Podal'],
    experience: '6+ anos',
    image: 'https://i.ibb.co/YFTb6NB6/herlon.png',
    imagePosition: 'object-[center_20%]'
  },
  {
    name: 'Gleizia Santos',
    role: 'Técnica em Epilação',
    description: 'Técnica especializada em epilação com foco no conforto e satisfação do cliente.',
    specialties: ['Epilação Feminina', 'Epilação Masculina', 'Cuidados Especiais'],
    experience: '4+ anos',
    image: 'https://i.ibb.co/SDzNLs99/Gemini-Generated-Image-xdimjrxdimjrxdim.png',
    imagePosition: 'object-[center_40%]'
  }
];

const TeamMemberCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
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

    const optimizedImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(member.image)}&w=600&q=80&output=webp`;

    return (
        <div 
            ref={cardRef} 
            className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-500 fade-in-section ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <img src={optimizedImageUrl} alt={member.name} className={`w-full h-80 object-cover ${member.imagePosition || 'object-center'}`} loading="lazy"/>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold font-serif">{member.name}</h3>
                <p className="text-[#a1887f] text-sm mb-3 font-semibold">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{member.description}</p>
                <div>
                    <h4 className="font-semibold text-sm mb-2 text-gray-800">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {member.specialties.map(spec => (
                            <span key={spec} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{spec}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-auto border-t pt-4">
                    <ClockIcon className="w-4 h-4 mr-2"/>
                    <span>Experiência: {member.experience}</span>
                </div>
            </div>
        </div>
    );
};


export const Team: React.FC = () => {
  return (
    <section className="py-20 bg-[#edeae6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Nossa Equipe</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Conheça nossos profissionais especializados em beleza e estética
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};