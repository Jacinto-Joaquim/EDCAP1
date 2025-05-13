
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
    import { useLocation } from 'react-router-dom';

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

    const ContactInfoItem = ({ icon, title, content, href }) => (
      <motion.div 
        className="flex items-start p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-3 bg-edcap-orange/10 rounded-full mr-4">
          {React.cloneElement(icon, { className: "h-6 w-6 text-edcap-orange" })}
        </div>
        <div>
          <h4 className="font-semibold text-primary">{title}</h4>
          {href ? (
            <a href={href} className="text-muted-foreground hover:text-edcap-orange transition-colors">{content}</a>
          ) : (
            <p className="text-muted-foreground">{content}</p>
          )}
        </div>
      </motion.div>
    );

    const ContatoPage = () => {
      const { toast } = useToast();
      const location = useLocation();
      const [formSubmitted, setFormSubmitted] = useState(false);
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        diagnostico: false,
      });

      useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('diagnostico') === 'true') {
          setFormData(prev => ({ ...prev, subject: 'Solicitação de Diagnóstico Gratuito', diagnostico: true }));
        }
      }, [location.search]);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulário enviado:", formData);
        
        toast({
          title: "Mensagem Enviada com Sucesso!",
          description: `Obrigado por entrar em contato, ${formData.name}. Responderemos o mais breve possível.`,
          variant: "default",
        });
        setFormSubmitted(true);
        // event.target.reset(); // Reset manual if needed, or clear state
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', diagnostico: false });
      };

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PageHeader 
            title="Entre em Contato Conosco"
            subtitle="Estamos prontos para ouvir você e ajudar a encontrar as melhores soluções para sua empresa."
          />

          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <motion.div 
                  className="lg:col-span-5 space-y-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold font-lato text-primary mb-6">Nossos Canais de Atendimento</h2>
                  <ContactInfoItem 
                    icon={<MapPin />} 
                    title="Nosso Escritório" 
                    content="Av. Exemplo, 1234, Sala 56 - Centro, São Paulo, SP, CEP 01000-000" 
                  />
                  <ContactInfoItem 
                    icon={<Phone />} 
                    title="Telefone" 
                    content="(11) 99999-9999" 
                    href="tel:+5511999999999"
                  />
                  <ContactInfoItem 
                    icon={<Mail />} 
                    title="Email Principal" 
                    content="contato@edcap.com.br" 
                    href="mailto:contato@edcap.com.br"
                  />
                  <div className="mt-8 h-72 md:h-80 rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-46.639399528503425%2C-23.55209098899999%2C-46.631399528503425%2C-23.54409098899999&amp;layer=mapnik&amp;marker=-23.54809099449999%2C-46.635399528503425" 
                      className="w-full h-full border-0"
                      loading="lazy"
                      title="Localização da EDCAP Consultoria"
                      aria-label="Mapa da localização da EDCAP Consultoria"
                    ></iframe>
                  </div>
                </motion.div>

                <motion.div 
                  className="lg:col-span-7"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="p-6 md:p-10 shadow-xl bg-white">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl md:text-3xl font-bold font-lato text-primary">Envie sua Mensagem</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {formSubmitted ? (
                        <div className="text-center py-10">
                          <CheckCircle className="h-16 w-16 text-edcap-green mx-auto mb-4" />
                          <h3 className="text-2xl font-semibold text-primary mb-2">Mensagem Enviada!</h3>
                          <p className="text-muted-foreground mb-6">Agradecemos seu contato. Nossa equipe responderá em breve.</p>
                          <Button onClick={() => setFormSubmitted(false)} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            Enviar Nova Mensagem
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="name" className="text-primary font-medium">Nome Completo*</Label>
                              <Input id="name" name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Seu nome" required className="mt-1 bg-background" />
                            </div>
                            <div>
                              <Label htmlFor="email" className="text-primary font-medium">Email*</Label>
                              <Input id="email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="seu@email.com" required className="mt-1 bg-background" />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="phone" className="text-primary font-medium">Telefone</Label>
                              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="(XX) XXXXX-XXXX" className="mt-1 bg-background" />
                            </div>
                            <div>
                              <Label htmlFor="company" className="text-primary font-medium">Empresa (Opcional)</Label>
                              <Input id="company" name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Nome da sua empresa" className="mt-1 bg-background" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="subject" className="text-primary font-medium">Assunto*</Label>
                            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="Sobre o que gostaria de falar?" required className="mt-1 bg-background" />
                          </div>
                          <div>
                            <Label htmlFor="message" className="text-primary font-medium">Mensagem*</Label>
                            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Descreva sua necessidade ou dúvida..." rows={5} required className="mt-1 bg-background" />
                          </div>
                          {formData.diagnostico && (
                            <div className="p-3 bg-edcap-green/10 text-edcap-green text-sm rounded-md">
                              <CheckCircle className="inline h-4 w-4 mr-1" /> Você está solicitando um diagnóstico gratuito. Nossa equipe entrará em contato para mais detalhes.
                            </div>
                          )}
                          <div>
                            <Button type="submit" size="lg" className="w-full bg-edcap-orange hover:bg-edcap-orange/90 text-white text-base group">
                              Enviar Mensagem
                              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>
      );
    };

    export default ContatoPage;
  