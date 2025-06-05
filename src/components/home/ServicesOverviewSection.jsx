
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Link } from 'react-router-dom';
    import { Briefcase, BarChart2, Lightbulb, Users, TrendingUp } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';

    const ServiceCard = ({ icon, title, description, link }) => (
      <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <CardHeader className="items-center text-center bg-gradient-to-br from-primary to-secondary p-6">
          <div className="p-3 bg-white/20 rounded-full mb-3 group-hover:scale-110 transition-transform">
            {React.cloneElement(icon, { className: "h-10 w-10 text-edcap-orange"})}
          </div>
          <CardTitle className="text-xl text-primary-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-center flex flex-col flex-grow">
          <CardDescription className="text-muted-foreground mb-4 flex-grow">{description}</CardDescription>
          <Button asChild variant="link" className="text-edcap-orange hover:text-edcap-green mt-auto">
            <Link to={link}>Saiba Mais <TrendingUp className="ml-1 h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    );

    const ServicesOverviewSection = () => (
      <Section className="bg-gray-50" id="servicos">
        <SectionTitle>Nossos Serviços Estratégicos</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            icon={<Briefcase />} 
            title="Gestão Empresarial"
            description="Otimização de processos, planejamento estratégico e governança corporativa para empresas."
            link="/servicos#gestao"
          />
          <ServiceCard 
            icon={<BarChart2 />} 
            title="Consultoria Financeira"
            description="Análise de viabilidade, gestão de fluxo de caixa, captação de recursos e reestruturação financeira."
            link="/servicos#financeira"
          />
          <ServiceCard 
            icon={<Lightbulb />} 
            title="Otimização de Processos"
            description="Mapeamento, redesenho e automação de processos para aumentar a eficiência e reduzir custos."
            link="/servicos#processos"
          />
          <ServiceCard 
            icon={<Users />} 
            title="Desenvolvimento de Equipes"
            description="Treinamento de equipes, desenvolvimento de lideranças e cultura organizacional."
            link="/servicos#equipes"
          />
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
            <Link to="/servicos">
              Ver Todos os Serviços
              <Briefcase className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </div>
      </Section>
    );

    export default ServicesOverviewSection;
  