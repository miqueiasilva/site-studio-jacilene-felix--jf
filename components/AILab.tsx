import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BotIcon, SendIcon } from './icons';

interface AILabProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChatEntry = {
  role: 'user' | 'model';
  parts: string;
};

export const AILab: React.FC<AILabProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fix: Per Gemini API guidelines, use process.env.API_KEY.
  // The value is injected by the build process (vite.config.ts).
  // @ts-ignore - 'process' is not defined in browser scope but is replaced by Vite.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `Você é a assistente virtual do Studio Jacilene Félix, um estúdio de beleza especializado em micropigmentação de sobrancelhas e lábios, Brow Lamination, e outros tratamentos estéticos. Seu nome é Jaci. Você deve ser extremamente amigável, profissional e prestativa. Use emojis para deixar a conversa mais leve. Sua principal função é ajudar as clientes, respondendo a perguntas sobre os serviços, cuidados, preços e agendamentos. Sempre que for perguntada sobre agendamentos, direcione a cliente para o link: https://www.salao99.com.br/studio-jacilene-felix. Mantenha as respostas concisas e diretas.`;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
    history: history.map(entry => ({
      role: entry.role,
      parts: [{ text: entry.parts }],
    })),
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);
  
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
}, [isOpen]);


  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatEntry = { role: 'user', parts: input };
    setHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: input });
      let text = '';
      
      // Add an empty model message to start streaming into
      setHistory(prev => [...prev, { role: 'model', parts: '' }]);

      for await (const chunk of result) {
        text += chunk.text;
        setHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].parts = text;
            return newHistory;
        });
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      setHistory(prev => [...prev, { role: 'model', parts: 'Desculpe, estou com um probleminha para me conectar. Tente novamente em alguns instantes. 🤖' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg h-[80vh] flex flex-col animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <BotIcon className="w-6 h-6 text-[#795548]" />
            <h2 className="text-xl font-serif text-[#312a27]">Assistente Virtual Jaci</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {history.map((entry, index) => (
            <div key={index} className={`flex items-start gap-3 ${entry.role === 'user' ? 'justify-end' : ''}`}>
              {entry.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#795548] flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>}
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${entry.role === 'user' ? 'bg-[#795548] text-white rounded-br-none' : 'bg-gray-200 text-[#312a27] rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{entry.parts}</p>
              </div>
            </div>
          ))}
          {isLoading && history[history.length - 1].role === 'user' && (
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#795548] flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-200 text-[#312a27] rounded-bl-none">
                   <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                   </div>
                </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </main>
        
        <footer className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="w-full p-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#a1887f] focus:bg-white transition"
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="flex-shrink-0 w-12 h-12 bg-[#795548] text-white rounded-full flex items-center justify-center hover:bg-[#6b4a3e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              <SendIcon className="w-6 h-6"/>
            </button>
          </div>
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
