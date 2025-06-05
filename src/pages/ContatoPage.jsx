
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Phone, Mail, MapPin, Send, Building } from 'lucide-react';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { useToast } from "@/components/ui/use-toast.jsx";
    import { Helmet } from 'react-helmet-async';
    import { getSupabase } from '@/config/supabaseClient.jsx';
    import { subscribeToMailchimp } from '@/services/marketingService.js';

    const ContatoPage = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { toast } = useToast();
      const supabase = getSupabase();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          // 1. Salvar no Supabase
          const { error: supabaseError } = await supabase
            .from('contact_submissions')
            .insert([{ 
              name: formData.name, 
              email: formData.email, 
              phone: formData.phone,
              subject: formData.subject,
              message: formData.message
            }]);

          if (supabaseError) {
            throw new Error(`Supabase error: ${supabaseError.message}`);
          }
          
          // 2. Enviar para Mailchimp
          const nameParts = formData.name.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');
          const mailchimpResult = await subscribeToMailchimp(formData.email, firstName, lastName);

          if (!mailchimpResult.success) {
             // Não lançar erro fatal, apenas notificar
            toast({
              title: "Inscrição na Newsletter",
              description: mailchimpResult.error || "Não foi possível inscrevê-lo na newsletter, mas sua mensagem foi enviada.",
              variant: "default", // Usar default para não parecer um erro crítico da mensagem principal
            });
          } else {
            toast({
              title: "Inscrito na Newsletter!",
              description: "Você também foi adicionado à nossa lista de emails.",
              variant: "default",
            });
          }

          toast({
            title: "Mensagem Enviada!",
            description: "Obrigado por entrar em contato. Responderemos em breve.",
            variant: "default",
          });
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        } catch (error) {
          console.error("Failed to send message or subscribe:", error);
          toast({
            title: "Erro ao Enviar",
            description: `Houve um problema: ${error.message}. Tente novamente.`,
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      const contactInfo = [
        { icon: <Phone className="h-6 w-6 text-accent" />, text: "+244 924 114 831", label: "Telefone (Angola)" },
        { icon: <Mail className="h-6 w-6 text-accent" />, text: "info@edcapconsultoria.com", label: "Email" },
        { icon: <MapPin className="h-6 w-6 text-accent" />, text: "Luanda, Kilamba (Ed. R29 ap. 63)", label: "Localização Principal" },
        { icon: <Building className="h-6 w-6 text-accent" />, text: "Escritório EDCAP (Detalhes sob consulta)", label: "Escritório" },
      ];

      const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126135.90991971196!2d13.23452625019531!3d-8.90090087019983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3b86552f731%3A0x5881df1568857096!2sViana%2C%20Angola!5e0!3m2!1spt-PT!2sbr!4v1700000000000!5m2!1spt-PT!2sbr";


      return (
        <>
          <Helmet>
            <title>Contato - Fale Conosco</title>
            <meta name="description" content="Entre em contato com a EDCAP em nosso escritório em Luanda - Kilamba (Ed. R29 ap. 63) ou em Viana, Angola. Estamos prontos para ajudar sua empresa a crescer." />
            <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contato - EDCAP Consultoria e Gestão",
                "description": "Entre em contato com a EDCAP Consultoria-Gestão para soluções empresariais em Angola.",
                "url": "https://www.edcapconsultoria.com/contato",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.edcapconsultoria.com/contato"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "EDCAP Consultoria e Gestão",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png"
                  }
                }
              }
            `}
            </script>
          </Helmet>
          <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <SectionTitle 
                title="Entre em Contato"
                subtitle="Estamos prontos para ouvir você e ajudar a impulsionar seu negócio em Angola."
                className="text-center mb-12 md:mb-16"
              />

              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary font-lato">Informações de Contato</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        {item.icon}
                        <div>
                          <p className="font-semibold text-primary">{item.label}</p>
                          <p className="text-muted-foreground">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-primary mb-3 font-lato">Nossa Localização no Kilamba (Ed. R29 ap. 63) ou em Viana, Luanda</h3>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-border">
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="350"
                        style={{ border:0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da EDCAP Consultoria em Viana, Luanda, Angola"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-card p-6 md:p-8 rounded-xl shadow-xl border border-border"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 font-lato">Envie-nos uma Mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-primary">Nome Completo</Label>
                      <Input type="text" name="name" id="name" placeholder="Seu nome" value={formData.name} onChange={handleChange} required className="mt-1 bg-input"/>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-primary">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required className="mt-1 bg-input"/>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-primary">Telefone (Opcional)</Label>
                        <Input type="tel" name="phone" id="phone" placeholder="+244 XXX XXX XXX" value={formData.phone} onChange={handleChange} className="mt-1 bg-input"/>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-primary">Assunto</Label>
                      <Input type="text" name="subject" id="subject" placeholder="Sobre o que gostaria de falar?" value={formData.subject} onChange={handleChange} required className="mt-1 bg-input"/>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-primary">Sua Mensagem</Label>
                      <Textarea name="message" id="message" rows="5" placeholder="Detalhe sua necessidade ou pergunta..." value={formData.message} onChange={handleChange} required className="mt-1 bg-input"/>
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></motion.div>
                      ) : (
                        <Send className="mr-2 h-5 w-5" />
                      )}
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </>
      );
    };

    export default ContatoPage;
  