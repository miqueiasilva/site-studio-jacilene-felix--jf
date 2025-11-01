import React, { useState, useEffect } from 'react';
import { BotIcon } from './icons';

interface FloatingButtonProps {
    openAILab: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ openAILab }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            onClick={openAILab}
            className={`group fixed bottom-6 right-6 bg-[#795548] text-white rounded-full shadow-lg flex items-center h-16 w-16 justify-center transition-all duration-300 ease-in-out hover:w-64 hover:justify-start hover:pl-4 hover:bg-[#6b4a3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a1887f] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-label="Tire suas dúvidas com a IA"
        >
            <div className="flex-shrink-0">
                <BotIcon className="w-8 h-8" />
            </div>
            <span className="ml-0 group-hover:ml-3 font-semibold whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-full transition-all duration-300 ease-in-out">
                Dúvidas? Fale com a IA
            </span>
        </button>
    );
};