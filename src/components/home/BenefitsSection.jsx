
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Award, BarChart2, Users } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';

    const BenefitCard = ({ icon, title, description }) => (
      <motion.div
        className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col items-center text-center"
        whileHover={{ y: -5 }}
      >
        <div className="p-4 bg-edcap-orange/10 rounded-full mb-4 inline-block">
          {React.cloneElement(icon, { className: "h-10 w-10 text-edcap-orange" })}
        </div>
        <h3 className="text-xl font-semibold font-lato mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </motion.div>
    );

    const BenefitsSection = () => (
      <Section className="bg-gray-50" id="beneficios">
        <SectionTitle>Por que escolher a EDCAP?</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard 
            icon={<Award />} 
            title="Experiência Comprovada"
            description="Anos de atuação no mercado, com um histórico de sucesso em diversos setores e portes de empresa."
          />
          <BenefitCard 
            icon={<BarChart2 />} 
            title="Resultados Mensuráveis"
            description="Foco em soluções práticas que geram impacto real e mensurável nos indicadores chave do seu negócio."
          />
          <BenefitCard 
            icon={<Users />} 
            title="Atendimento Personalizado"
            description="Entendemos as particularidades de cada cliente, oferecendo consultoria sob medida para suas necessidades."
          />
        </div>
      </Section>
    );

    export default BenefitsSection;
  