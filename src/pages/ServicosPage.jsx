
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Link } from 'react-router-dom';
    import { Briefcase, BarChart2, Lightbulb, Users, CheckCircle, TrendingUp } from 'lucide-react';

    const Section = ({ children, className = '', id }) => (
      <motion.section
        id={id}
        className={`py-16 md:py-20 ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">{children}</div>
      </motion.section>
    );

    const PageHeader = ({ title, subtitle }) => (
      <div className="bg-gradient-to-r from-primary to-secondary py-20 md:py-28 text-center text-primary-foreground">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold font-lato mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    );

    const ServiceDetailCard = ({ id, icon, title, description, benefits = [], imageAlt }) => (
      <Section id={id} className="scroll-mt-20">
        <Card className="overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-6 md:p-10 order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-edcap-orange/10 rounded-full mr-4">
                  {React.cloneElement(icon, { className: "h-8 w-8 text-edcap-orange" })}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-lato text-primary">{title}</h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
              {benefits.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold text-primary mb-2">Principais Benefícios:</h4>
                  <ul className="space-y-2 mb-6">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-edcap-green mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Button asChild className="bg-edcap-orange hover:bg-edcap-orange/90 text-white group">
                <Link to="/contato">
                  Solicitar Consultoria
                  <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 h-64 md:h-full min-h-[300px]">
              <img  class="w-full h-full object-cover" alt={imageAlt} src="https://images.unsplash.com/photo-1690721606848-ac5bdcde45ea" />
            </div>
          </div>
        </Card>
      </Section>
    );

    const ServicosPage = () => {
      const services = [
        {
          id: "gestao",
          icon: <Briefcase />,
          title: "Consultoria em Gestão Empresarial",
          description: "Apoiamos PMEs na estruturação e otimização de sua gestão, desde o planejamento estratégico até a governança corporativa. Nosso objetivo é fortalecer sua base para um crescimento sólido e sustentável.",
          benefits: [
            "Definição de metas e estratégias claras.",
            "Melhoria na tomada de decisões.",
            "Aumento da eficiência organizacional.",
            "Fortalecimento da cultura empresarial."
          ],
          imageAlt: "Team discussing business strategy around a table"
        },
        {
          id: "financeira",
          icon: <BarChart2 />,
          title: "Consultoria Financeira Estratégica",
          description: "Oferecemos soluções completas para a saúde financeira do seu negócio, incluindo análise de viabilidade de projetos, gestão de fluxo de caixa, captação de recursos e reestruturação financeira. Maximize sua rentabilidade e segurança financeira.",
          benefits: [
            "Melhor controle do fluxo de caixa.",
            "Otimização de custos e despesas.",
            "Acesso a melhores condições de crédito.",
            "Planejamento financeiro de longo prazo."
          ],
          imageAlt: "Financial charts and graphs on a screen"
        },
        {
          id: "processos",
          icon: <Lightbulb />,
          title: "Otimização de Processos",
          description: "Identificamos gargalos e oportunidades de melhoria em seus processos operacionais. Através de mapeamento, redesenho e automação, buscamos aumentar a eficiência, reduzir custos e melhorar a qualidade dos seus produtos ou serviços.",
          benefits: [
            "Redução de desperdícios e retrabalho.",
            "Aumento da produtividade da equipe.",
            "Melhoria na qualidade e padronização.",
            "Maior agilidade e flexibilidade operacional."
          ],
          imageAlt: "Flowchart diagram illustrating process optimization"
        },
        {
          id: "equipes",
          icon: <Users />,
          title: "Desenvolvimento de Equipes e Liderança",
          description: "Acreditamos que o capital humano é o maior ativo de uma empresa. Oferecemos programas de treinamento, coaching, desenvolvimento de lideranças e fortalecimento da cultura organizacional para criar equipes de alta performance.",
          benefits: [
            "Aumento do engajamento e motivação da equipe.",
            "Desenvolvimento de líderes eficazes.",
            "Melhoria no clima organizacional.",
            "Retenção de talentos."
          ],
          imageAlt: "Diverse group of people in a collaborative workshop"
        }
      ];

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PageHeader 
            title="Nossos Serviços de Consultoria"
            subtitle="Soluções estratégicas e personalizadas para impulsionar cada área da sua empresa."
          />

          {services.map((service, index) => (
            <ServiceDetailCard 
              key={service.id}
              id={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              imageAlt={service.imageAlt}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            />
          ))}

          <Section id="cta-servicos" className="bg-gradient-to-r from-edcap-green to-green-600 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">Pronto para Elevar o Nível da Sua Empresa?</h2>
              <p className="text-lg md:text-xl mb-10 text-green-100">
                Nossos especialistas estão prontos para entender suas necessidades e propor as melhores soluções. Entre em contato e agende uma conversa sem compromisso.
              </p>
              <Button asChild size="lg" className="bg-white text-edcap-green hover:bg-gray-100 text-lg px-10 py-7 group">
                <Link to="/contato">
                  Fale com um Especialista
                  <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Section>
        </motion.div>
      );
    };

    export default ServicosPage;
  