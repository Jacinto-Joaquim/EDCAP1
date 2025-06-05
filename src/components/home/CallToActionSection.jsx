
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { TrendingUp } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';

    const CallToActionSection = () => (
      <Section className="bg-gradient-to-r from-edcap-orange to-orange-500 text-white" id="cta">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-lato mb-6">Pronto para Transformar Sua Empresa?</h2>
          <p className="text-lg md:text-xl mb-10 text-orange-100">
            Não espere mais para alcançar o potencial máximo do seu negócio. Solicite um diagnóstico e descubra como a EDCAP pode ajudar sua empresa a crescer e prosperar.
          </p>
          <Button asChild size="lg" className="bg-white text-edcap-orange hover:bg-gray-100 text-lg px-10 py-7 group">
            <Link to="/contato?diagnostico=true">
              Solicite seu Diagnóstico Gratuito
              <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>
    );

    export default CallToActionSection;
  