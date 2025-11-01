import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { WandIcon } from './icons';

const API_KEY = process.env.API_KEY;


const AILab: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Personalized Consultation State
    const [consultationPrompt, setConsultationPrompt] = useState('Meu tipo de pele é oleosa e tenho 30 anos. Quero um plano de tratamento completo para os próximos 6 meses, focando em micropigmentação de sobrancelhas e rejuvenescimento da pele. Quais serviços você recomenda e em que ordem?');
    const [consultationResult, setConsultationResult] = useState('');
    
    const handleConsultation = async () => {
        if (!consultationPrompt) return;
        setIsLoading(true);
        setError(null);
        setConsultationResult('');
        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY! });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-pro",
                contents: consultationPrompt,
                config: { thinkingConfig: { thinkingBudget: 32768 } }
            });
            setConsultationResult(response.text);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderLoader = (text: string) => (
      <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 rounded-lg">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#795548]"></div>
          <p className="mt-4 text-[#312a27] font-semibold">{text}</p>
      </div>
    );

    return (
        <section className="py-20 bg-[#edeae6]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Nosso Laboratório de IA</h2>
                    <p className="max-w-3xl mx-auto text-gray-600">Experimente o futuro da consultoria de beleza com nossas ferramentas de IA.</p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
                    
                    <div className="bg-white/80 p-8 rounded-lg shadow-lg relative backdrop-blur-sm">
                        {isLoading && renderLoader('Processando com IA...')}
                        <h3 className="text-2xl font-serif mb-4 flex items-center"><WandIcon className="mr-2"/>Consulta Personalizada (Modo Pensamento)</h3>
                        <p className="text-gray-600 mb-4">Faça perguntas complexas e receba um plano detalhado. A IA usará seu poder máximo de raciocínio.</p>
                        <textarea
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#a1887f] focus:border-[#a1887f] transition"
                            rows={6}
                            value={consultationPrompt}
                            onChange={(e) => setConsultationPrompt(e.target.value)}
                        />
                        <button onClick={handleConsultation} disabled={isLoading} className="w-full mt-4 bg-[#795548] text-white py-3 rounded-lg hover:bg-[#6b4a3e] transition-colors duration-300 font-semibold disabled:bg-gray-400">
                            Obter Consulta
                        </button>
                        {consultationResult && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <h4 className="font-semibold mb-2">Seu Plano de Beleza Personalizado:</h4>
                                <p className="text-gray-700 whitespace-pre-wrap">{consultationResult}</p>
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                        <strong>Erro:</strong> {error}
                    </div>
                )}
            </div>
        </section>
    );
};

export { AILab };