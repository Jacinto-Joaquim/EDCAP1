
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Card } from '@/components/ui/card.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { useToast } from '@/components/ui/use-toast.js';
    import { MapPin, Phone, Mail, Send } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { getSupabase } from '@/config/supabaseClient.jsx';
    import { subscribeToMailchimp } from '@/services/marketingService.js';

    const ContactFormSection = () => {
      const { toast } = useToast();
      const supabase = getSupabase();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Inscrição Newsletter Home', 
        message: '', 
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        try {
          
          const { error: supabaseError } = await supabase
            .from('newsletter_subscriptions')
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

          
          const nameParts = formData.name.split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');
          const mailchimpResult = await subscribeToMailchimp(formData.email, firstName, lastName);

          if (!mailchimpResult.success) {
            toast({
              title: "Erro na Inscrição",
              description: mailchimpResult.error || "Não foi possível completar sua inscrição na newsletter.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Inscrição Realizada!",
              description: "Obrigado por se inscrever em nossa newsletter.",
              variant: "default",
            });
          }
          
          setFormData({ name: '', email: '', phone: '', subject: 'Inscrição Newsletter Home', message: '' });
          event.target.reset(); 

        } catch (error) {
          console.error("Failed to subscribe to newsletter:", error);
          toast({
            title: "Erro na Inscrição",
            description: `Houve um problema: ${error.message}. Tente novamente.`,
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <Section id="contato-home" className="bg-muted/30">
          <SectionTitle 
            title="Mantenha-se Atualizado"
            subtitle="Inscreva-se em nossa newsletter para receber as últimas novidades, insights e ofertas exclusivas da EDCAP Consultoria diretamente no seu email."
            className="text-center mb-12"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h3 className="text-3xl font-semibold font-lato text-primary mb-4">Conecte-se Conosco</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Não perca nenhuma atualização importante! Ao se inscrever, você terá acesso a conteúdos valiosos que podem transformar seu negócio.
              </p>
              <img-replace src="https://images.unsplash.com/photo-1557804506-669a67965ba0" alt="Pessoas colaborando em uma reunião de negócios moderna" className="rounded-lg shadow-xl w-full h-auto object-cover max-h-80" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 shadow-2xl bg-card">
                <h4 className="text-2xl font-semibold text-primary mb-6 text-center font-lato">Inscreva-se na Newsletter</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="home-name" className="text-primary font-medium">Nome Completo</Label>
                    <Input id="home-name" name="name" type="text" placeholder="Seu nome completo" required className="mt-1 bg-input" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="home-email" className="text-primary font-medium">Seu Melhor Email</Label>
                    <Input id="home-email" name="email" type="email" placeholder="Ex: seuemail@dominio.com" required className="mt-1 bg-input" value={formData.email} onChange={handleChange} />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></motion.div>
                    ) : (
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isSubmitting ? 'Inscrevendo...' : 'Inscrever Agora'}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </Section>
      );
    };

    export default ContactFormSection;
  