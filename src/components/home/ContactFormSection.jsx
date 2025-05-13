
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { MapPin, Phone, Mail } from 'lucide-react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';

    const ContactFormSection = () => {
      const { toast } = useToast();

      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        
        toast({
          title: "Mensagem Enviada!",
          description: `Obrigado por entrar em contato, ${name || 'Prezado(a)'}. Responderemos em breve.`,
          variant: "default",
        });
        event.target.reset();
      };

      return (
        <Section id="contato-home">
          <SectionTitle>Entre em Contato</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold font-lato text-primary mb-4">Fale Conosco</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tem alguma dúvida ou quer saber mais sobre nossos serviços? Preencha o formulário ao lado ou utilize um dos nossos canais de atendimento. Estamos prontos para ajudar!
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-edcap-orange" />
                  <span>Av. Exemplo, 1234, Sala 56 - São Paulo, SP</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-edcap-orange" />
                  <a href="tel:+5511999999999" className="hover:text-edcap-orange">(11) 99999-9999</a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-edcap-orange" />
                  <a href="mailto:contato@edcap.com.br" className="hover:text-edcap-orange">contato@edcap.com.br</a>
                </li>
              </ul>
              <div className="mt-8 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.639399528503425%2C-23.55209098899999%2C-46.631399528503425%2C-23.54409098899999&amp;layer=mapnik" 
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Localização da EDCAP Consultoria"
                ></iframe>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-primary">Nome Completo</Label>
                    <Input id="name" name="name" type="text" placeholder="Seu nome" required className="mt-1 bg-background" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-primary">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="mt-1 bg-background" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-primary">Telefone (Opcional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(XX) XXXXX-XXXX" className="mt-1 bg-background" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-primary">Assunto</Label>
                    <Input id="subject" name="subject" type="text" placeholder="Sobre o que gostaria de falar?" required className="mt-1 bg-background" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-primary">Mensagem</Label>
                    <Textarea id="message" name="message" placeholder="Sua mensagem..." rows={4} required className="mt-1 bg-background" />
                  </div>
                  <Button type="submit" className="w-full bg-edcap-orange hover:bg-edcap-orange/90 text-white py-3 text-base">
                    Enviar Mensagem
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </Section>
      );
    };

    export default ContactFormSection;
  