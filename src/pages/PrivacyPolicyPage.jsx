
    import React from 'react';
    import { motion } from 'framer-motion';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { ShieldCheck, FileText, Users, Database, Lock } from 'lucide-react';
    import { Helmet } from 'react-helmet-async';

    const PrivacyPolicyPage = () => {
      const policySections = [
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Introdução",
          content: "Bem-vindo à Política de Privacidade da EDCAP Consultoria. Comprometemo-nos a proteger a sua privacidade e a garantir que os seus dados pessoais sejam tratados com segurança e transparência. Esta política descreve como recolhemos, usamos, partilhamos e protegemos as suas informações quando visita o nosso website ou utiliza os nossos serviços."
        },
        {
          icon: <Users className="h-8 w-8 text-accent" />,
          title: "Informações que Recolhemos",
          content: "Podemos recolher informações pessoais que você nos fornece diretamente, como nome, email, número de telefone e informações da empresa, quando preenche formulários de contato, se regista para newsletters ou solicita os nossos serviços. Também podemos recolher informações automaticamente através de cookies e tecnologias semelhantes, como o seu endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site."
        },
        {
          icon: <Database className="h-8 w-8 text-accent" />,
          title: "Como Usamos as Suas Informações",
          content: "Utilizamos as suas informações para: Fornecer e melhorar os nossos serviços; Comunicar consigo sobre os seus pedidos e os nossos serviços; Personalizar a sua experiência no nosso website; Enviar informações de marketing e promocionais (com o seu consentimento); Cumprir obrigações legais e regulatórias; Analisar o uso do site para otimizar o desempenho e a usabilidade."
        },
        {
          icon: <Lock className="h-8 w-8 text-accent" />,
          title: "Partilha e Segurança dos Dados",
          content: "Não vendemos nem alugamos as suas informações pessoais a terceiros. Podemos partilhar as suas informações com prestadores de serviços de confiança que nos ajudam a operar o nosso website e a fornecer os nossos serviços, sob acordos de confidencialidade. Implementamos medidas de segurança técnicas e organizacionais para proteger os seus dados contra acesso não autorizado, alteração, divulgação ou destruição."
        },
        {
          icon: <ShieldCheck className="h-8 w-8 text-accent" />,
          title: "Os Seus Direitos",
          content: "Você tem o direito de aceder, corrigir, atualizar ou solicitar a exclusão das suas informações pessoais. Também pode opor-se ao processamento dos seus dados ou solicitar a limitação do mesmo. Para exercer esses direitos, entre em contato conosco através dos canais fornecidos. Se tiver alguma dúvida sobre esta política ou sobre as nossas práticas de privacidade, não hesite em nos contatar."
        },
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Cookies",
          content: "Utilizamos cookies para melhorar a funcionalidade do nosso site e a sua experiência de navegação. Cookies são pequenos ficheiros de texto armazenados no seu dispositivo. Você pode gerir as suas preferências de cookies através das configurações do seu navegador. A recusa de certos cookies pode afetar a funcionalidade do site."
        },
         {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Alterações a Esta Política",
          content: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações significativas publicando a nova política no nosso website. Recomendamos que reveja esta política regularmente."
        }
      ];

      return (
        <>
        <Helmet>
            <title>Política de Privacidade</title>
            <meta name="description" content="Conheça a política de privacidade da EDCAP Consultoria e como protegemos seus dados pessoais em Angola." />
        </Helmet>
        <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Política de Privacidade"
              subtitle="A sua privacidade é importante para nós. Entenda como tratamos os seus dados."
              className="text-center mb-12 md:mb-16"
            />

            <div className="max-w-3xl mx-auto space-y-10">
              {policySections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    {section.icon}
                    <h2 className="text-xl md:text-2xl font-semibold text-primary font-lato">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </motion.section>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: policySections.length * 0.1 + 0.2 }}
              className="mt-12 text-center text-sm text-muted-foreground"
            >
              <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
              <p>Para quaisquer questões, por favor, entre em contato conosco através do email: <a href="mailto:info@edcapconsultoria.co.ao" className="text-accent hover:underline">info@edcapconsultoria.co.ao</a>.</p>
            </motion.div>
          </div>
        </div>
        </>
      );
    };

    export default PrivacyPolicyPage;
  