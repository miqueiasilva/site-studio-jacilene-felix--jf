import React, { useState, useEffect } from 'react';

interface HeaderProps {
  scrollToSection: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ scrollToSection, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', section: 'home' },
    { name: 'Serviços', section: 'servicos' },
    { name: 'Profissionais', section: 'profissionais' },
    { name: 'Resultados', section: 'resultados' },
    { name: 'FAQ', section: 'faq' },
    { name: 'Contato', section: 'contato' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#312a27] shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection('home')} className="flex items-center text-left">
              <img src="https://i.ibb.co/CsTQHWpN/Sem-T-tulo-1-removebg-preview.png" alt="Studio Jacilene Félix Logo" className="h-12 mr-2" />
              <span className="text-white text-2xl font-serif">Studio Jacilene Félix</span>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.section)} 
                className={`text-white hover:text-[#d3c1b8] transition-colors duration-300 pb-1 ${activeSection === link.section ? 'border-b-2 border-[#d3c1b8] text-[#d3c1b8]' : 'border-b-2 border-transparent'}`}
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="bg-[#795548] text-white px-6 py-2 rounded-full hover:bg-[#6b4a3e] transition-colors duration-300">
              Agendar Agora
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#312a27] py-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => { scrollToSection(link.section); setIsMenuOpen(false); }} 
                className={`text-white hover:text-[#d3c1b8] transition-colors duration-300 ${activeSection === link.section ? 'text-[#d3c1b8]' : ''}`}
              >
                {link.name}
              </button>
            ))}
            <a href="https://www.salao99.com.br/studio-jacilene-felix" target="_blank" rel="noopener noreferrer" className="bg-[#795548] text-white px-6 py-2 rounded-full hover:bg-[#6b4a3e] transition-colors duration-300 mt-4">
              Agendar Agora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};