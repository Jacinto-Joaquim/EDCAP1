
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
        answer: "A EDCAP Consultoria especializa-se em consultoria estratégica, gestão de projetos, desenvolvimento de negócios, otimização de processos e transformação digital para empresas em Angola, com foco particular em Luanda e Viana."
      },
      {
        question: "Como a EDCAP pode ajudar a minha empresa a crescer?",
        answer: "Através de uma análise detalhada do seu negócio, identificamos oportunidades de melhoria, desenvolvemos estratégias personalizadas e auxiliamos na implementação de soluções que impulsionam o crescimento, aumentam a eficiência e melhoram a rentabilidade."
      },
      {
        question: "Qual é o processo de contratação dos serviços da EDCAP?",
        answer: "O processo inicia-se com uma consulta inicial gratuita para entendermos as suas necessidades. Em seguida, apresentamos uma proposta detalhada. Após a aprovação, iniciamos o projeto com um planeamento cuidadoso e comunicação transparente."
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
        question: "Como posso entrar em contato para saber mais?",
        answer: "Você pode entrar em contato conosco através do formulário no nosso site, por email (info@edcapconsultoria.co.ao) ou pelo telefone (+244 9XX XXX XXX). Teremos todo o prazer em agendar uma conversa."
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
  