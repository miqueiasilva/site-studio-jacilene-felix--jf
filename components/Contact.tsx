import React from 'react';
import { LocationIcon, WhatsAppIcon, ClockIcon } from './icons';

export const Contact: React.FC = () => {
  return (
    <section className="py-20 bg-[#edeae6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#312a27] mb-4">Entre em Contato</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Estamos prontas para atender você. Entre em contato e tire todas as suas dúvidas.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#795548] rounded-full flex items-center justify-center">
                <LocationIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Localização</h3>
                <p className="text-gray-600">R. Santina Gomes de Andrade, 04 - loja 04 - Centro</p>
                <p className="text-gray-600">Igarassu - PE, 53610-272</p>
                <a href="https://www.google.com/maps/place/Studio+Jacilene+Flix+Micropigmentao+Esttica++Cilios++Igarassu" target="_blank" rel="noopener noreferrer" className="text-[#795548] hover:underline text-sm font-semibold">Clique para ver no mapa</a>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#795548] rounded-full flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">WhatsApp</h3>
                <p className="text-gray-600">(81) 99568-5910</p>
                <a href="https://api.whatsapp.com/send/?phone=5581995685910" target="_blank" rel="noopener noreferrer" className="text-[#795548] hover:underline text-sm font-semibold">Clique para iniciar uma conversa</a>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#795548] rounded-full flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Horário de Funcionamento</h3>
                <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                <p className="text-gray-600">Sábado: 8h às 16h</p>
                <p className="text-gray-600">Domingo: Fechado</p>
              </div>
            </div>
             <div className="mt-6 rounded-lg overflow-hidden h-64">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.53581832008!2d-34.90847268522201!3d-7.732734994431835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab19a3d4f1c1c7%3A0x8979a4054a835a6!2sR.%20Santina%20Gomes%20de%20Andrade%2C%204%20-%20Loja%2004%20-%20Centro%2C%20Igarassu%20-%20PE%2C%2053610-272!5e0!3m2!1spt-BR!2sbr"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do Studio Jacilene Félix"
                  ></iframe>
            </div>
          </div>
          <div className="lg:w-2/3 bg-white/80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
            <h3 className="text-2xl font-serif mb-6">Envie sua Mensagem</h3>
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="sr-only">Nome Completo</label>
                    <input type="text" id="name" placeholder="Nome completo" className="w-full p-4 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#a1887f] focus:bg-white transition" />
                </div>
                 <div>
                    <label htmlFor="whatsapp" className="sr-only">WhatsApp</label>
                    <input type="text" id="whatsapp" placeholder="WhatsApp" className="w-full p-4 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#a1887f] focus:bg-white transition" />
                </div>
                 <div>
                    <label htmlFor="service" className="sr-only">Serviço de Interesse</label>
                    <select id="service" className="w-full p-4 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#a1887f] focus:bg-white transition text-gray-500">
                        <option>Selecione um serviço</option>
                        <option>Micropigmentação de Sobrancelhas</option>
                        <option>Micropigmentação de Lábios</option>
                        <option>Brow Lamination</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Mensagem</label>
                    <textarea id="message" rows={5} placeholder="Conte-nos mais sobre suas necessidades..." className="w-full p-4 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-[#a1887f] focus:bg-white transition"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-[#795548] text-white py-4 rounded-lg hover:bg-[#6b4a3e] transition-colors duration-300 font-semibold">Enviar Mensagem</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};