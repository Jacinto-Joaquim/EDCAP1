
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { Users } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';

    const AboutEdcapSection = () => (
      <Section id="sobre-nos">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img  className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]" alt="Equipe EDCAP em reunião estratégica" src="https://images.unsplash.com/photo-1590402494610-2c378a9114c6" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-lato text-primary mb-6">Sobre a EDCAP Consultoria</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              A EDCAP é uma empresa especializada nas áreas de consultoria empresarial, gestão, planejamento estratégico e marketing, com atuação consolidada desde 2017. Ao longo dos anos, tem se destacado pelo compromisso com a excelência, seriedade e geração de valor para os seus parceiros e clientes.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Iniciamos nossa trajetória com foco em treinamentos profissionais, direcionados ao empreendedorismo, vendas e estratégia de negócios, contribuindo para o fortalecimento de competências e o desenvolvimento de lideranças.
            </p>
            <Button asChild variant="outline" className="border-edcap-orange text-edcap-orange hover:bg-edcap-orange hover:text-white group">
              <Link to="/sobre">
                Conheça Nossa História
                <Users className="ml-2 h-4 w-4 group-hover:animate-pulse" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Section>
    );

    export default AboutEdcapSection;
  