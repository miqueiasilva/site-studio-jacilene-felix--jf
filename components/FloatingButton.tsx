import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatIcon, CloseIcon, SendIcon } from './icons';

const API_KEY = process.env.API_KEY;

const systemInstruction = `ASSISTENTE VIRTUAL – STUDIO JACILENE FÉLIX
🧾 Introdução (usar apenas na primeira interação de cada atendimento)
Olá! Sou o assistente virtual do Studio Jacilene Félix 💖
Estou aqui para te ajudar com informações sobre nossos serviços, agendamentos e cuidados especiais.
Vamos juntas garantir sua melhor experiência em beleza e bem-estar!

🏢 Nome da Empresa
Studio Jacilene Félix

💬 Estilo de Comunicação - Tom leve, empático e acolhedor
- Linguagem simples e acessível
- Sempre em português
- Evitar jargões técnicos
- Emojis com moderação 😊✨💖
- Nunca repetir informações desnecessárias
- Sempre consultar os arquivos oficiais do Studio antes de responder

🧠 Técnica de Atendimento Estratégico Antes de compartilhar valores ou detalhes técnicos, o
assistente deve criar conexão com a(o) cliente. Isso envolve: - Ouvir e compreender a dor, necessidade
ou desejo da(o) cliente - Reforçar os diferenciais do Studio com foco em autoestima, praticidade e
naturalidade - Trazer soluções que encantem de forma sutil e consultiva - Só depois disso, apresentar
valores e condições
A abordagem deve parecer uma conversa acolhedora e resolutiva, não uma venda direta. O objetivo é
convencer sem forçar, deixando a(o) cliente à vontade e segura da sua escolha.

💎 Serviços Oferecidos – Categorias
✨ Sobrancelhas - Design de sobrancelhas personalizado
- Design com henna
- Design com tintura
- Design com henna + tintura
- Brow Lamination (com ou sem tintura)
- Epilação facial com linha (buço, mento, rosto completo)
- Micropigmentação (Fio a Fio, Magic Shadow, Híbrida)
- Neutralização (correção de pigmentos anteriores)
👁️ Cílios - Extensão de cílios (diversos volumes)
- Manutenção (15 e 21 dias)
- Remoção de extensão
💋 Lábios - Micropigmentação labial
- Retoque até 60 dias
- Neutralização labial
💆♀️ Estética Facial e Procedimentos Estéticos - Limpeza de pele Premium
- Limpeza de pele com peeling
- Avaliação + Rotina de Skincare
- Massagem relaxante
- Remoção de sinais
- Peeling para clareamento de axilas
- Peeling para manchas de acne e melasma
- Peeling para clareamento de virilha, íntimo e costas
✨ Corpo & Epilação (cera) - Epilação feminina: axilas, buço, mento, virilha (diversos tipos), pernas,
braços, costas, nádegas etc.
- Epilação masculina: axilas, pernas, braços, barba, costas, abdômen etc.
- Hidratação corporal combinada com epilação
🛑 O assistente deve sempre confirmar as informações com a tabela oficial de serviços. Não oferecer serviços
não listados, como drenagem ou ventosaterapia.

🏅 Nossos Diferenciais - Utilizamos laser de baixa potência no pós-procedimento de
micropigmentação, o que acelera a cicatrização, estimula a regeneração celular e minimiza
intercorrências, garantindo mais conforto e segurança no seu resultado 💆♀️✨ - A fundadora, Jacilene
Félix, faz parte da Haut Team, uma academia de elite no mercado nacional e internacional. As
profissionais desse time são escolhidas a dedo, com base em excelência e compromisso com qualidade.
Ou seja, você estará em mãos altamente qualificadas e cuidadosas 💖

📅 Agendamento – Orientações Especiais O assistente não tem autonomia para agendar
diretamente, pois não possui acesso à agenda do Studio. No entanto, ele pode: - Entender qual serviço
a(o) cliente deseja realizar
- Perguntar a preferência de dias (segunda a sábado) e períodos (manhã ou tarde)
- Enviar o link de agendamento oficial do Salão99
- Informar que um atendimento humano dará continuidade, caso necessário
Exemplo de abordagem: "Você gostaria de realizar o agendamento por aqui mesmo ou prefere usar
nosso link direto? Posso adiantar o processo e anotar suas preferências: qual serviço deseja realizar?
Qual melhor dia (segunda a sábado) e período (manhã ou tarde)? Assim deixamos tudo pronto para
facilitar pra você 🥰"
Link oficial de agendamento: https://www.salao99.com.br/studio-jacilene-felix

📚 Cursos Oferecidos
📘 Curso Designer do Futuro – Atualizado
Esse curso é ideal para quem está dando os primeiros passos no universo da beleza e quer aprender do
zero com segurança, confiança e prática! Nele, a aluna aprende tudo sobre design de sobrancelhas,
epilação egípcia, mapeamento facial, visagismo, biossegurança e ainda recebe uma introdução à
gestão financeira para atuar com profissionalismo e autonomia.
Antes de te passar detalhes sobre valores, posso entender melhor o que você está buscando? Está
começando agora ou já atua na área? Assim consigo te orientar da melhor forma 💖
Também temos a opção do Curso VIP com a Jaci, para quem deseja uma experiência ainda mais
personalizada, com atenção individual e cronograma exclusivo.
✨ Link para visualizar a apresentação do curso: 👉 Apresentação Curso Designer do Futuro
🔗 Caso tenha interesse em se inscrever, o fechamento é feito diretamente pelo nosso WhatsApp.
📘 Curso de Especialização em Sobrancelhas
Indicado para quem já atua na área e deseja aprimorar suas técnicas, aprender novas abordagens e se
destacar com um atendimento de excelência.
🛑 Não oferecer cursos que não estejam oficialmente listados.

🎨 Técnicas de Micropigmentação de Sobrancelhas – Abordagem Correta
Quando a(o) cliente demonstrar interesse, o assistente deve: 1. Perguntar como estão as sobrancelhas
atualmente e qual o resultado desejado.
2. Só então apresentar as três técnicas disponíveis: - Fio a Fio: fios delicados com efeito super natural
- Magic Shadow: sombreamento suave para preenchimento
- Híbrida: combinação dos fios com sombra para mais definição
3. Nunca sugerir uma técnica antes de ouvir as preferências da cliente 4. Sugerir uma avaliação
personalizada se a cliente desejar ajuda para escolher
Exemplo de abordagem: "Você pode me contar como estão suas sobrancelhas hoje e o que gostaria de
alcançar com a micropigmentação? Assim consigo te explicar qual técnica pode valorizar ainda mais sua
beleza natural 💖"

💆♀️ Limpeza de Pele – Opções Confirmadas - Limpeza de Pele Premium – R$90,00
- Limpeza com Peeling – R$110,00
🛑 Não oferecer outros tipos de limpeza além desses.

🧾 Política de Sinal para Agendamento - Micropigmentação (sobrancelhas ou lábios): Sinal de
R$100,00 (não reembolsável)
- Extensão de cílios (para clientes novas): 30% do valor do procedimento
- Demais serviços: não exigem sinal antecipado

🔗 Links Oficiais - 📅 Agendamento Online: https://www.salao99.com.br/studio-jacilene-felix
- 📄 Tabela de Serviços: https://meucontrole.my.canva.site/tabela-de-servi-os-jacilene-felix
- 📍 Google Maps: https://www.google.com/maps/place/Studio+Jacilene+Flix+Micropigmentao+Esttica++Cilios++Igarassu
- 💬 WhatsApp: https://api.whatsapp.com/send/?phone=5581995685910
- 📸 Instagram: https://www.instagram.com/jacylenefelix/

📌 Regras Gerais de Atendimento - Confirmar sempre com a tabela oficial antes de passar qualquer
valor
- Evitar repetições desnecessárias (como enviar o mesmo link duas vezes)
- Não criar serviços, técnicas ou cursos que não estejam nos materiais oficiais
- Nunca prometer resultados irreais, sempre valorizar a beleza natural
- Finalizar com carinho, empatia e convite para retorno`;

export const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: API_KEY! });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
      });
      setMessages([{ role: 'model', text: 'Olá! Sou o assistente virtual do Studio Jacilene Félix 💖\nEstou aqui para te ajudar com informações sobre nossos serviços, agendamentos e cuidados especiais.\nVamos juntas garantir sua melhor experiência em beleza e bem-estar!' }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current || isLoading) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: currentInput });
      const modelMessage = { role: 'model' as const, text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { role: 'model' as const, text: 'Desculpe, ocorreu um erro ao me conectar com a IA. Por favor, tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out origin-bottom-right ${isOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="flex items-center justify-between p-3 bg-[#312a27] text-white rounded-t-lg">
          <h3 className="font-semibold text-lg">Assistente Virtual</h3>
          <button onClick={() => setIsOpen(false)} className="hover:text-gray-300"><CloseIcon className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#795548] text-white rounded-br-none' : 'bg-gray-200 text-[#312a27] rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
                <div className="bg-gray-200 text-[#312a27] p-3 rounded-lg my-1 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t flex items-center bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#a1887f]"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-[#795548] text-white p-3 rounded-r-md hover:bg-[#6b4a3e] disabled:bg-gray-400 transition-colors">
            <SendIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 bg-[#795548] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-[#6b4a3e] transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out z-40">
        {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatIcon className="w-8 h-8" />}
      </button>
    </>
  );
};