
import React from 'react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#312a27] text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">Studio Jacilene Félix</h3>
            <p className="text-sm mb-4">
              Especialistas em beleza natural e micropigmentação com atendimento premium e resultados excepcionais.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/jacylenefelix/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><InstagramIcon className="w-6 h-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white"><WhatsAppIcon className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Micropigmentação de Sobrancelhas</a></li>
              <li><a href="#" className="hover:text-white">Micropigmentação Labial</a></li>
              <li><a href="#" className="hover:text-white">Brow Lamination</a></li>
              <li><a href="#" className="hover:text-white">Evolution Skin</a></li>
              <li><a href="#" className="hover:text-white">Remoção</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white">Política de Reagendamento</a></li>
              <li><a href="#" className="hover:text-white">LGPD</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>R. Santina Gomes de Andrade, 04 - loja 04 - Centro</li>
              <li>Igarassu - PE, 53610-272</li>
              <li>(81) 99568-5910</li>
              <li>contato@jacilenefelix.com.br</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Studio Jacilene Félix. Todos os direitos reservados. Powered by Readdly</p>
        </div>
      </div>
    </footer>
  );
};
