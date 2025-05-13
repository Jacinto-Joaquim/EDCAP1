
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Link } from 'react-router-dom';
    import { Users, Target, Eye, Award, ShieldCheck, HeartHandshake as Handshake } from 'lucide-react';

    const Section = ({ children, className = '', id }) => (
      <motion.section
        id={id}
        className={`py-16 md:py-20 ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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

    const ValueCard = ({ icon, title, description }) => (
      <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
        <div className="mb-4 inline-block p-3 bg-edcap-orange/10 rounded-full">
          {React.cloneElement(icon, { className: "h-10 w-10 text-edcap-orange" })}
        </div>
        <CardTitle className="text-xl mb-2 text-primary">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Card>
    );

    const TeamMemberCard = ({ name, role, imageSrc, bio }) => (
      <Card className="overflow-hidden text-center hover:shadow-xl transition-shadow">
        <div className="aspect-[4/3] overflow-hidden">
          <img  class="w-full h-full object-cover" alt={name} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl text-primary">{name}</CardTitle>
          <p className="text-sm text-edcap-orange font-semibold">{role}</p>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
        </CardContent>
      </Card>
    );

    const SobrePage = () => {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PageHeader 
            title="Sobre a EDCAP Consultoria"
            subtitle="Conheça nossa história, missão, visão, valores e a equipe que transforma desafios em resultados."
          />

          <Section id="nossa-historia">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-lato text-primary mb-6">Nossa Jornada</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Fundada com a paixão por impulsionar o sucesso de pequenas e médias empresas, a EDCAP Consultoria nasceu da percepção de que muitas PMEs, apesar de seu enorme potencial, enfrentavam desafios complexos em gestão, finanças e operações que limitavam seu crescimento.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Ao longo dos anos, construímos uma reputação sólida baseada na entrega de resultados tangíveis e na construção de parcerias de longo prazo com nossos clientes. Nossa abordagem é sempre personalizada, combinando expertise técnica com um profundo entendimento das particularidades de cada negócio.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Hoje, somos referência em consultoria estratégica para PMEs, orgulhosos de cada empresa que ajudamos a prosperar e de cada desafio que transformamos em oportunidade.
                </p>
              </div>
              <div>
                <img  class="rounded-lg shadow-xl w-full h-auto object-cover max-h-[450px]" alt="Marco histórico da EDCAP ou colagem de momentos" src="https://images.unsplash.com/photo-1594277427483-86e8c3ed77f6" />
              </div>
            </div>
          </Section>

          <Section id="missao-visao-valores" className="bg-gray-50">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{duration:0.5, delay:0.1}} className="p-6">
                <Target className="h-16 w-16 text-edcap-orange mx-auto mb-4" />
                <h3 className="text-2xl font-semibold font-lato text-primary mb-3">Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Capacitar pequenas e médias empresas a alcançar seu pleno potencial através de soluções de consultoria estratégica, inovadoras e personalizadas, gerando crescimento sustentável e resultados mensuráveis.
                </p>
              </motion.div>
              <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{duration:0.5, delay:0.2}} className="p-6">
                <Eye className="h-16 w-16 text-edcap-orange mx-auto mb-4" />
                <h3 className="text-2xl font-semibold font-lato text-primary mb-3">Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a consultoria líder e mais admirada no apoio ao desenvolvimento e sucesso de PMEs no Brasil, reconhecida pela excelência, integridade e impacto positivo nos negócios de nossos clientes.
                </p>
              </motion.div>
              <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{duration:0.5, delay:0.3}} className="p-6">
                <Award className="h-16 w-16 text-edcap-orange mx-auto mb-4" />
                <h3 className="text-2xl font-semibold font-lato text-primary mb-3">Valores</h3>
                <ul className="text-muted-foreground space-y-1 leading-relaxed">
                  <li><ShieldCheck className="inline h-4 w-4 mr-1 text-edcap-green" /> Integridade e Ética</li>
                  <li><Handshake className="inline h-4 w-4 mr-1 text-edcap-green" /> Parceria com o Cliente</li>
                  <li><Target className="inline h-4 w-4 mr-1 text-edcap-green" /> Foco em Resultados</li>
                  <li><Award className="inline h-4 w-4 mr-1 text-edcap-green" /> Excelência e Inovação</li>
                  <li><Users className="inline h-4 w-4 mr-1 text-edcap-green" /> Valorização das Pessoas</li>
                </ul>
              </motion.div>
            </div>
          </Section>

          <Section id="nossa-equipe">
            <h2 className="text-3xl md:text-4xl font-bold font-lato text-primary mb-12 text-center">Nossa Equipe de Especialistas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMemberCard 
                name="Ana Beatriz Oliveira" 
                role="CEO & Consultora Sênior" 
                imageSrc="Professional woman smiling, business attire"
                bio="Com mais de 15 anos de experiência em estratégia e gestão, Ana lidera a EDCAP com paixão por transformar negócios. Especialista em reestruturação e crescimento acelerado."
              />
              <TeamMemberCard 
                name="Carlos Mendes Silva" 
                role="Diretor Financeiro & Consultor" 
                imageSrc="Professional man in suit, confident expression"
                bio="Expert em finanças corporativas, Carlos ajuda PMEs a otimizar sua saúde financeira, captar investimentos e planejar o futuro com segurança e rentabilidade."
              />
              <TeamMemberCard 
                name="Juliana Pereira Lima" 
                role="Gerente de Operações & Consultora" 
                imageSrc="Smiling woman with glasses, professional setting"
                bio="Focada em eficiência operacional, Juliana é mestre em mapear e otimizar processos, implementando soluções que reduzem custos e aumentam a produtividade."
              />
            </div>
            <p className="text-center text-muted-foreground mt-10 text-lg">
              E muitos outros talentos dedicados a impulsionar o seu sucesso!
            </p>
          </Section>

          <Section id="cta-sobre" className="bg-gradient-to-r from-edcap-orange to-orange-500 text-white">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">Vamos Construir o Futuro da Sua Empresa Juntos?</h2>
              <p className="text-lg md:text-xl mb-10 text-orange-100">
                Acreditamos no poder da colaboração e da estratégia inteligente. Entre em contato conosco e descubra como a expertise da EDCAP pode ser o diferencial que sua empresa precisa.
              </p>
              <Button asChild size="lg" className="bg-white text-edcap-orange hover:bg-gray-100 text-lg px-10 py-7">
                <Link to="/contato">Fale com Nossos Consultores</Link>
              </Button>
            </div>
          </Section>

        </motion.div>
      );
    };

    export default SobrePage;
  