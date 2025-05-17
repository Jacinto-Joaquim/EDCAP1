
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Card } from '@/components/ui/card';
    import { Link } from 'react-router-dom';
    import { MessageSquare, CheckCircle } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';

    const TestimonialCard = ({ quote, author, company }) => (
      <Card className="bg-primary text-primary-foreground p-6 md:p-8 rounded-xl shadow-xl h-full flex flex-col">
        <MessageSquare className="h-10 w-10 text-edcap-orange mb-4" />
        <blockquote className="text-lg italic mb-6 text-blue-200 flex-grow">"{quote}"</blockquote>
        <div className="flex items-center mt-auto">
          <div className="w-12 h-12 rounded-full bg-edcap-orange flex items-center justify-center text-white font-bold text-xl mr-4">
            {author.substring(0,1)}
          </div>
          <div>
            <p className="font-semibold text-lg">{author}</p>
            <p className="text-sm text-blue-300">{company}</p>
          </div>
        </div>
      </Card>
    );

    const TestimonialsSection = () => (
      <Section id="cases">
        <SectionTitle>O que nossos clientes dizem</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="A EDCAP transformou nossa gestão financeira. Conseguimos aumentar nossa lucratividade em 25% em apenas 6 meses!"
            author="João Silva"
            company="CEO, Tech Solutions Ltda."
          />
          <TestimonialCard 
            quote="O processo de otimização de processos proposto pela EDCAP foi um divisor de águas para nossa produtividade. Recomendo fortemente!"
            author="Maria Oliveira"
            company="Diretora de Operações, Indústria Inovadora S.A."
          />
          <TestimonialCard 
            quote="Com a ajuda da EDCAP, nossa equipe se tornou mais engajada e alinhada com os objetivos da empresa. Os resultados foram imediatos."
            author="Carlos Santos"
            company="Gerente de RH, Varejo Crescer"
          />
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-edcap-orange hover:bg-edcap-orange/90 text-white group">
            <Link to="/cases">
              Ver Mais Cases de Sucesso
              <CheckCircle className="ml-2 h-5 w-5 group-hover:scale-125 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>
    );

    export default TestimonialsSection;
  