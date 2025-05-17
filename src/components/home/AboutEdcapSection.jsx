
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
              A EDCAP é uma consultoria especializada em transformar o potencial de pequenas e médias empresas em performance excepcional. Nossa missão é fornecer insights estratégicos e soluções práticas que impulsionem o crescimento sustentável e a excelência operacional.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Com uma equipe de consultores experientes e apaixonados por resultados, combinamos conhecimento técnico aprofundado com uma abordagem colaborativa, trabalhando lado a lado com nossos clientes para superar desafios e alcançar seus objetivos mais ambiciosos.
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
  