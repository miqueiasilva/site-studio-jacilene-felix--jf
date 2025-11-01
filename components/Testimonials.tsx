import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { StarIcon } from './icons';

const API_KEY = process.env.API_KEY;

interface Testimonial {
  clientName: string;
  service: string;
  rating: number;
  quote: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    clientName: 'Ana Clara',
    service: 'Micropigmentação de Sobrancelhas',
    rating: 5,
    quote: 'O resultado ficou incrível! Muito natural e exatamente como eu queria. A Jacilene é uma artista!',
  },
  {
    clientName: 'Mariana Costa',
    service: 'Micropigmentação Labial',
    rating: 5,
    quote: 'Meus lábios ganharam vida! A cor ficou perfeita e o procedimento foi super tranquilo. Recomendo demais!',
  },
  {
    clientName: 'Sofia Lima',
    service: 'Brow Lamination',
    rating: 5,
    quote: 'Estou apaixonada pelas minhas sobrancelhas! O efeito alinhado dura muito e facilita demais meu dia a dia.',
  },
];

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className="w-5 h-5 text-yellow-400" filled={i < rating} />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, index: number }> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`bg-white p-8 rounded-lg shadow-lg transition-all duration-500 fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Rating rating={testimonial.rating} />
      <blockquote className="text-gray-600 my-4">"{testimonial.quote}"</blockquote>
      <div className="text-right">
        <p className="font-bold font-serif text-[#312a27]">{testimonial.clientName}</p>
        <p className="text-sm text-[#a1887f]">{testimonial.service}</p>
      </div>
    </div>
  );
};


export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!API_KEY) {
        setTestimonials(fallbackTestimonials);
        setIsLoading(false);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const responseSchema = {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                clientName: { type: Type.STRING },
                service: { type: Type.STRING },
                rating: { type: Type.INTEGER, description: 'Rating from 1 to 5' },
                quote: { type: Type.STRING },
              },
              required: ['clientName', 'service', 'rating', 'quote'],
            },
          };
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: "Generate 3 diverse and realistic client testimonials for a high-end beauty studio called 'Studio Jacilene Félix'. The services include Micropigmentação de Sobrancelhas, Micropigmentação de Lábios, Brow Lamination, and Remoção a laser. The tone should be positive and authentic.",
          config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        });

        const jsonStr = response.text.trim();
        const generatedTestimonials = JSON.parse(jsonStr);
        setTestimonials(generatedTestimonials);

      } catch (error) {
        console.error('Error fetching AI testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">O que Nossas Clientes Dizem</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            A satisfação de nossas clientes é nossa maior recompensa.
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 p-8 rounded-lg shadow-lg h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};