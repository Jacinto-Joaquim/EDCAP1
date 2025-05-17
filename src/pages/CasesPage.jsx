
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Link } from 'react-router-dom';
    import { TrendingUp, Zap, Users, BarChartBig, CheckCircle } from 'lucide-react';
    import { Helmet } from 'react-helmet-async';

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

    const CaseStudyCard = ({ title, client, industry, challenge, solution, results, imageAlt, icon, imageName }) => (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
          <div className="relative h-56 bg-gray-200">
            <img  className="w-full h-full object-cover" alt={imageAlt} src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-3 rounded-full shadow-md">
              {React.cloneElement(icon, { className: "h-7 w-7" })}
            </div>
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl md:text-2xl text-primary font-lato">{title}</CardTitle>
            <CardDescription className="text-sm">
              <span className="font-semibold text-gray-700">{client}</span> | Setor: {industry}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="mb-4 flex-grow">
              <p className="mb-2"><strong className="text-gray-700">Desafio:</strong> <span className="text-muted-foreground">{challenge}</span></p>
              <p className="mb-2"><strong className="text-gray-700">Solução EDCAP:</strong> <span className="text-muted-foreground">{solution}</span></p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-primary mb-1">Resultados Chave:</h4>
              <ul className="list-none space-y-1 text-sm">
                {results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );

    const CasesPage = () => {
      const caseStudies = [
        {
          title: "Reestruturação Financeira e Aumento de Lucratividade",
          client: "Indústria Metalúrgica Alfa",
          industry: "Metalurgia",
          challenge: "Fluxo de caixa desorganizado, endividamento crescente e baixa lucratividade.",
          solution: "Implementação de sistema de gestão financeira, renegociação de dívidas e otimização de custos.",
          results: [
            "Aumento de 25% na lucratividade líquida em 12 meses.",
            "Redução de 40% no endividamento de curto prazo.",
            "Melhoria de 90% na previsibilidade do fluxo de caixa."
          ],
          imageAlt: "Maquinaria industrial numa fábrica metalúrgica",
          imageName: "Industrial machinery in a metalworking factory",
          icon: <BarChartBig />
        },
        {
          title: "Otimização de Processos e Ganho de Eficiência",
          client: "Varejista Beta E-commerce",
          industry: "E-commerce",
          challenge: "Processos logísticos lentos, alto índice de erros em pedidos e baixa satisfação do cliente.",
          solution: "Mapeamento e redesenho dos processos de picking, packing e expedição, com implantação de WMS simplificado.",
          results: [
            "Redução de 30% no tempo de processamento de pedidos.",
            "Diminuição de 70% nos erros de expedição.",
            "Aumento de 15% na satisfação do cliente (NPS)."
          ],
          imageAlt: "Armazém com prateleiras cheias de produtos para e-commerce",
          imageName: "Warehouse with shelves stocked with products for e-commerce",
          icon: <Zap />
        },
        {
          title: "Desenvolvimento de Liderança e Cultura Organizacional",
          client: "Empresa de Serviços Gamma TI",
          industry: "Tecnologia da Informação",
          challenge: "Alta rotatividade de talentos, baixa moral da equipe e falta de clareza nos papéis de liderança.",
          solution: "Programa de desenvolvimento de líderes, workshops de cultura e comunicação, e implementação de sistema de feedback contínuo.",
          results: [
            "Redução de 50% na taxa de turnover em 18 meses.",
            "Aumento de 20% no índice de engajamento da equipe.",
            "Melhoria significativa na comunicação interna e colaboração."
          ],
          imageAlt: "Equipe diversificada colaborando num espaço de escritório moderno",
          imageName: "Diverse team collaborating in a modern office space",
          icon: <Users />
        },
         {
          title: "Expansão de Mercado e Estratégia de Crescimento",
          client: "Produtora de Alimentos Delta",
          industry: "Alimentos e Bebidas",
          challenge: "Estagnação nas vendas e dificuldade em penetrar novos mercados regionais.",
          solution: "Análise de mercado, desenvolvimento de nova estratégia de precificação e canais de distribuição, e plano de marketing focado.",
          results: [
            "Aumento de 18% no faturamento total em 2 anos.",
            "Entrada bem-sucedida em 3 novos estados.",
            "Crescimento de 10% no market share do principal produto."
          ],
          imageAlt: "Exposição de produtos alimentares num supermercado ou linha de produção",
          imageName: "Display of food products in a supermarket or production line",
          icon: <TrendingUp />
        }
      ];

      return (
        <>
        <Helmet>
            <title>Cases de Sucesso - Resultados Comprovados</title>
            <meta name="description" content="Descubra como a EDCAP Consultoria ajudou empresas em Angola a alcançar resultados significativos através de soluções estratégicas e personalizadas." />
            <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Cases de Sucesso - EDCAP Consultoria",
                "description": "Explore nossos cases de sucesso e veja como podemos ajudar sua empresa em Angola.",
                "url": "https://www.edcapconsultoria.co.ao/cases",
                "publisher": {
                  "@type": "Organization",
                  "name": "EDCAP Consultoria",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png"
                  }
                }
              }
            `}
            </script>
        </Helmet>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PageHeader 
            title="Cases de Sucesso EDCAP"
            subtitle="Veja como ajudamos empresas como a sua a superar desafios e alcançar resultados extraordinários."
          />

          <Section id="nossos-cases">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {caseStudies.map((study, index) => (
                <CaseStudyCard 
                  key={index}
                  title={study.title}
                  client={study.client}
                  industry={study.industry}
                  challenge={study.challenge}
                  solution={study.solution}
                  results={study.results}
                  imageAlt={study.imageAlt}
                  imageName={study.imageName}
                  icon={study.icon}
                />
              ))}
            </div>
          </Section>

          <Section id="cta-cases" className="bg-gradient-to-r from-accent to-orange-500 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">Sua Empresa Pode Ser Nosso Próximo Case de Sucesso!</h2>
              <p className="text-lg md:text-xl mb-10 text-orange-100">
                Independentemente do seu desafio, a EDCAP tem a expertise para ajudar sua empresa a alcançar novos patamares. Vamos conversar sobre suas metas?
              </p>
              <Button asChild size="lg" className="bg-white text-accent hover:bg-gray-100 text-lg px-10 py-7 group">
                <Link to="/contato">
                  Agende uma Consultoria Gratuita
                  <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Section>
        </motion.div>
        </>
      );
    };

    export default CasesPage;
  