
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { TrendingUp } from 'lucide-react';

    const HeroSection = () => (
      <div className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img  alt="Abstract background pattern" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1585753035830-8205de3dd213" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-lato mb-6 leading-tight">
              Transformamos <span className="text-edcap-orange">desafios</span> empresariais em <span className="text-edcap-green">resultados</span> consistentes.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-blue-200 max-w-2xl mx-auto">
              Consultoria estratégica especializada em impulsionar o crescimento e a eficiência de pequenas e médias empresas.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild size="lg" className="bg-edcap-orange hover:bg-edcap-orange/90 text-white text-lg px-10 py-7 group">
                <Link to="/contato">
                  Fale com um Consultor
                  <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );

    export default HeroSection;
  