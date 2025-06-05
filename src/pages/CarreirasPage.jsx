
    import React from 'react';
    import { motion } from 'framer-motion';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { Briefcase, Users, Lightbulb, TrendingUp } from 'lucide-react';
    import { Button } from '@/components/ui/button.jsx';
    import { Link } from 'react-router-dom';
    import { Helmet } from 'react-helmet-async';

    const CarreirasPage = () => {
      const opportunities = [
        {
          title: "Consultor Estratégico Sénior",
          description: "Procuramos um consultor experiente para liderar projetos de transformação e estratégia para clientes de grande porte.",
          requirements: ["+5 anos de experiência em consultoria", "MBA ou equivalente", "Fortes capacidades analíticas e de comunicação"],
          icon: <Briefcase className="h-8 w-8 text-accent" />
        },
        {
          title: "Analista de Negócios Júnior",
          description: "Uma oportunidade para recém-graduados talentosos que desejam iniciar uma carreira em consultoria e análise de dados.",
          requirements: ["Licenciatura em Gestão, Economia ou similar", "Excelentes habilidades com Excel e PowerPoint", "Proatividade e vontade de aprender"],
          icon: <Lightbulb className="h-8 w-8 text-accent" />
        },
        {
          title: "Gestor de Projetos Digitais",
          description: "Responsável pelo planeamento, execução e entrega de projetos de transformação digital para os nossos clientes.",
          requirements: ["Experiência em gestão de projetos ágeis", "Conhecimento de tecnologias digitais", "Certificação PMP ou similar é uma vantagem"],
          icon: <TrendingUp className="h-8 w-8 text-accent" />
        }
      ];

      return (
        <>
        <Helmet>
            <title>Carreiras na EDCAP Consultoria e Gestão</title>
            <meta name="description" content="Junte-se à equipe da EDCAP Consultoria em Angola. Veja as nossas oportunidades de carreira e faça parte da transformação." />
        </Helmet>
        <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Trabalhe Conosco"
              subtitle="Faça parte de uma equipe dinâmica e inovadora que está a moldar o futuro dos negócios em Angola."
              className="text-center mb-12 md:mb-16"
            />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border mb-12"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Users className="h-10 w-10 text-primary" />
                <div>
                  <h2 className="text-2xl font-semibold text-primary font-lato">Por que a EDCAP?</h2>
                  <p className="text-muted-foreground">Oferecemos um ambiente de trabalho estimulante, oportunidades de desenvolvimento profissional e a chance de causar um impacto real.</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-4">
                <li>Projetos desafiadores e variados.</li>
                <li>Cultura de colaboração e aprendizagem contínua.</li>
                <li>Pacote de remuneração competitivo.</li>
                <li>Oportunidade de crescimento na carreira.</li>
              </ul>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {opportunities.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                  className="bg-card p-6 rounded-xl shadow-lg border border-border flex flex-col"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {job.icon}
                    <h3 className="text-xl font-semibold text-primary font-lato">{job.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 flex-grow">{job.description}</p>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Requisitos:</p>
                    <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1 pl-4 mb-4">
                      {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Saber Mais
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: opportunities.length * 0.15 + 0.6 }}
              className="text-center"
            >
              <p className="text-lg text-foreground/90 mb-4">Não encontrou a vaga ideal? Envie-nos a sua candidatura espontânea!</p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/contato?assunto=Candidatura Espontânea">
                  Enviar Candidatura
                </Link>
              </Button>
            </motion.div>

          </div>
        </div>
        </>
      );
    };

    export default CarreirasPage;
  