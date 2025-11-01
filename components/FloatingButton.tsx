import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './icons';

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
            className={`fixed bottom-6 right-6 w-16 h-16 bg-[#795548] text-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:bg-[#6b4a3e] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a1887f] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-label="Abrir assistente virtual"
        >
            <SparklesIcon className="w-8 h-8" />
        </button>
    );
};
