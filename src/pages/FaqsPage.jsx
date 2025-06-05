
    import React from 'react';
    import { motion } from 'framer-motion';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
    import { Helmet } from 'react-helmet-async';
    import { Button } from '@/components/ui/button.jsx';
    import { Link } from 'react-router-dom';

    const faqsData = [
      {
        question: "Quais são as principais áreas de atuação da EDCAP Consultoria?",
        answer: "A EDCAP Consultoria especializa-se em consultoria estratégica, gestão de projetos, desenvolvimento de negócios, otimização de processos e transformação digital para empresas em Angola."
      },
      {
        question: "Como a EDCAP pode ajudar a minha empresa a crescer?",
        answer: "Através de uma análise detalhada do seu negócio, identificamos oportunidades de melhoria, desenvolvemos estratégias personalizadas e auxiliamos na implementação de soluções que impulsionam o crescimento, aumentam a eficiência e melhoram a rentabilidade."
      },
      {
        question: "Quanto custa a legalização de uma empresa com a EDCAP?",
        answer: "Os valores variam conforme o tipo de empresa, localização e ramo de atividade. No entanto, oferecemos pacotes acessíveis e personalizados para cada cliente. Entre em contato e enviaremos um orçamento claro, sem surpresas."
      },
      {
        question: "A EDCAP trabalha com pequenas e médias empresas (PMEs)?",
        answer: "Sim, atendemos empresas de todos os portes, desde startups a grandes corporações. Adaptamos as nossas metodologias e soluções às necessidades específicas de cada cliente, incluindo PMEs."
      },
      {
        question: "Quanto tempo demora um projeto de consultoria típico?",
        answer: "A duração de um projeto varia consideravelmente dependendo da complexidade e do escopo dos serviços. Projetos mais curtos podem durar algumas semanas, enquanto transformações mais abrangentes podem levar vários meses. Fornecemos uma estimativa de tempo na nossa proposta."
      },
      {
        question: "Como posso contratar os serviços da EDCAP?",
        answer: `É simples. Você pode entrar em contato pelos nossos canais:${<br></br>}

                  WhatsApp/Telefone: +244 924 114 831${<br></br>}

                  E-mail: edcap45consultoria54gestao@gmail.com${<br></br>}

                  Instagram: @edcap_45.gestão${<br></br>}

                  Visita presencial (com agendamento): Kilamba, Edifício R29, apartamento 63${<br></br>}

                  Nossa equipa está pronta para ouvir, planejar e agir com você.`
      },
      {
        question: "Vocês fazem apenas consultoria ou também ajudam na execução?",
        answer: "Fazemos os dois. A EDCAP oferece consultoria estratégica e execução prática, desde a análise do negócio, elaboração de planos, até a implementação de soluções, legalização e treinamentos."
      },
      {
        question: "Preciso de ajuda para organizar minha empresa. Vocês oferecem esse serviço?",
        answer: `Sim! A EDCAP é especialista em reestruturação e organização empresarial, incluindo:${<br></br>}

                  Estruturação administrativa${<br></br>}

                  Definição de cargos e funções${<br></br>}

                  Fluxo de processos internos${<br></br>}

                  Planejamento financeiro e estratégico${<br></br>}

                  Criação de organogramas e sistemas de gestão`
      },
      {
        question: "A EDCAP oferece treinamentos?",
        answer: `Sim. Oferecemos formações práticas e personalizadas nas áreas de:${<br></br>}

                  Planejamento estratégico${<br></br>}

                  Gestão de equipes e liderança${<br></br>}

                  Cultura organizacional${<br></br>}

                  Comunicação empresarial${<br></br>}

                  Atendimento ao cliente${<br></br>}

                  Marketing e posicionamento${<br></br>}

                  São formações para donos, gestores e colaboradores.`
      },
      {
        question: "Vocês atendem somente em Luanda?",
        answer: `Nosso escritório central está em Luanda – Centralidade do Kilamba, mas também atendemos online e presencialmente em outras províncias, mediante agendamento. A EDCAP é flexível e está preparada para atender clientes em todo o país.`
      }, 
      {
        question: "Qual o diferencial da EDCAP em relação a outras empresas de consultoria?",
        answer: `Nosso diferencial está em:${<br></br>}

                  Atendimento personalizado e próximo${<br></br>}

                  Foco em resultados reais${<br></br>}

                  Equipe multidisciplinar e experiente${<br></br>}

                  Transparência e ética em todos os processos${<br></br>}

                  Capacidade de unir teoria e prática, com execução de ponta a ponta`
      },
      {
        question: "Quais são os preços dos serviços de consultoria?",
        answer: "Os valores são adaptados ao porte da empresa e ao tipo de serviço necessário. Trabalhamos com planos e pacotes mensais ou por projeto, sempre com clareza, contrato formal e possibilidade de negociação. O objetivo é caber no seu bolso e gerar valor real para o seu negócio."
      },
      {
        question: "Como posso contratar os serviços da EDCAP?",
        answer: `É simples. Você pode entrar em contato pelos nossos canais:${<br></br>}

                  WhatsApp/Telefone: +244 924 114 831${<br></br>}

                  E-mail: edcap45consultoria54gestao@gmail.com${<br></br>}

                  Instagram: @edcap_45.gestão${<br></br>}

                  Visita presencial (com agendamento): Kilamba, Edifício R29, apartamento 63${<br></br>}

                  Nossa equipa está pronta para ouvir, planejar e agir com você.`
      },
      {
        question: "A EDCAP também ajuda a captar clientes e organizar redes sociais?",
        answer: `Sim! Oferecemos consultoria de marketing, branding e posicionamento nas redes sociais, com foco em:${<br></br>}

                  Criação de identidade visual${<br></br>}

                  Planejamento de conteúdo${<br></br>}

                  Estratégia de marca${<br></br>}

                  Treinamento de equipe de comunicação${<br></br>}

                  Organização de atendimento digital (WhatsApp, Instagram, etc.)`
      }
    ];

    const FaqItem = ({ question, answer, isOpen, onClick }) => {
      return (
        <motion.div 
          className="border-b border-border"
          initial={false}
          animate={{ backgroundColor: isOpen ? "var(--card)" : "transparent" }}
        >
          <button
            onClick={onClick}
            className="flex justify-between items-center w-full py-5 px-6 text-left hover:bg-muted/50 transition-colors duration-200"
          >
            <span className="text-lg font-medium text-primary">{question}</span>
            {isOpen ? <ChevronUp className="h-5 w-5 text-accent" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </button>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '1rem' : 0, marginBottom: isOpen ? '1.25rem' : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-6"
          >
            <p className="text-muted-foreground leading-relaxed pb-1">{answer}</p>
          </motion.div>
        </motion.div>
      );
    };

    const FaqsPage = () => {
      const [openIndex, setOpenIndex] = React.useState(null);

      const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };

      return (
        <>
        <Helmet>
            <title>FAQs - Perguntas Frequentes</title>
            <meta name="description" content="Encontre respostas para as perguntas mais frequentes sobre os serviços de consultoria e gestão da EDCAP em Angola." />
        </Helmet>
        <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Perguntas Frequentes (FAQs)"
              subtitle="Tire as suas dúvidas sobre os nossos serviços e como podemos ajudar o seu negócio."
              className="text-center mb-12 md:mb-16"
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-border overflow-hidden"
            >
              {faqsData.map((faq, index) => (
                <FaqItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleClick(index)}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: faqsData.length * 0.05 + 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-lg text-foreground/90 mb-4">Ainda tem dúvidas? Entre em contato conosco!</p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contato">
                  Fale Conosco <HelpCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

          </div>
        </div>
        </>
      );
    };

    export default FaqsPage;
  