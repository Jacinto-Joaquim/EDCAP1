
    import React from 'react';
    import { motion } from 'framer-motion';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { FileText, Shield, UserCheck, AlertTriangle } from 'lucide-react';
    import { Helmet } from 'react-helmet-async';

    const TermosDeUsoPage = () => {
      const termsSections = [
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Aceitação dos Termos",
          content: "Ao aceder e utilizar o website da EDCAP Consultoria ('Site'), você concorda em cumprir e estar vinculado a estes Termos de Uso e à nossa Política de Privacidade. Se não concordar com qualquer parte destes termos, não deverá utilizar o nosso Site."
        },
        {
          icon: <UserCheck className="h-8 w-8 text-accent" />,
          title: "Uso do Conteúdo do Site",
          content: "Todo o conteúdo presente neste Site, incluindo textos, gráficos, logotipos, imagens e software, é propriedade da EDCAP Consultoria ou dos seus licenciadores e está protegido por leis de direitos autorais. Você pode visualizar e descarregar materiais do Site apenas para uso pessoal e não comercial, desde que mantenha todos os avisos de direitos autorais e outras notificações de propriedade."
        },
        {
          icon: <Shield className="h-8 w-8 text-accent" />,
          title: "Conduta do Usuário",
          content: "Você concorda em não utilizar o Site para qualquer finalidade ilegal ou proibida por estes Termos. Não deve usar o Site de forma que possa danificar, desabilitar, sobrecarregar ou prejudicar o Site ou interferir no uso e aproveitamento do Site por terceiros. É proibido tentar obter acesso não autorizado a quaisquer sistemas ou redes conectados ao Site."
        },
        {
          icon: <AlertTriangle className="h-8 w-8 text-accent" />,
          title: "Limitação de Responsabilidade",
          content: "O conteúdo do Site é fornecido 'como está', sem garantias de qualquer tipo, expressas ou implícitas. A EDCAP Consultoria não garante que o Site estará livre de erros ou interrupções. Em nenhuma circunstância a EDCAP Consultoria será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o Site."
        },
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Links para Sites de Terceiros",
          content: "O Site pode conter links para websites de terceiros que não são controlados pela EDCAP Consultoria. Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites de terceiros. A inclusão de qualquer link não implica endosso pela EDCAP Consultoria."
        },
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Modificações nos Termos",
          content: "A EDCAP Consultoria reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no Site. O uso continuado do Site após tais alterações constitui a sua aceitação dos novos Termos."
        },
        {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Lei Aplicável",
          content: "Estes Termos de Uso serão regidos e interpretados de acordo com as leis de Angola, sem consideração aos seus conflitos de disposições legais. Qualquer disputa relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais de Luanda, Angola."
        }
      ];

      return (
        <>
        <Helmet>
            <title>Termos de Uso</title>
            <meta name="description" content="Consulte os termos de uso do website da EDCAP Consultoria. Entenda as regras e condições para utilização dos nossos serviços online em Angola." />
        </Helmet>
        <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Termos de Uso"
              subtitle="Leia atentamente os termos e condições para utilização do nosso website."
              className="text-center mb-12 md:mb-16"
            />

            <div className="max-w-3xl mx-auto space-y-10">
              {termsSections.map((section, index) => (
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
              transition={{ duration: 0.5, delay: termsSections.length * 0.1 + 0.2 }}
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

    export default TermosDeUsoPage;
  