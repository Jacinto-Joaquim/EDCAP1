
    import React from 'react';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { Card, CardContent } from '@/components/ui/card.jsx';
    import { PlayCircle } from 'lucide-react';
    import { motion } from 'framer-motion';

    const videoTestimonialsData = [
      {
        id: 1,
        title: "Transformação Digital com a EDCAP",
        client: "Ana Silva, CEO da InovaTech",
        videoId: "dQw4w9WgXcQ", // Placeholder YouTube Video ID
        description: "Veja como a EDCAP ajudou a InovaTech a otimizar seus processos e alcançar novos mercados."
      },
      {
        id: 2,
        title: "Crescimento Acelerado",
        client: "Carlos Santos, Diretor da Expansão Global",
        videoId: "L_LUpnjgPso", // Placeholder YouTube Video ID
        description: "A consultoria estratégica da EDCAP foi fundamental para o nosso crescimento de 150% em um ano."
      },
      {
        id: 3,
        title: "Eficiência e Resultados",
        client: "Beatriz Costa, Gerente de Operações da LogiMaster",
        videoId: "3JZ_D3ELwOQ", // Placeholder YouTube Video ID
        description: "Com a EDCAP, nossa eficiência operacional melhorou significativamente, reduzindo custos e aumentando a satisfação do cliente."
      }
    ];

    const VideoCard = ({ title, client, videoId, description }) => {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="overflow-hidden shadow-lg h-full flex flex-col bg-background hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-video relative group">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white/80" />
              </div>
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-semibold font-lato text-primary mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{client}</p>
              <p className="text-sm text-foreground/80 flex-grow">{description}</p>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    const VideoTestimonialsSection = () => {
      return (
        <Section id="video-testimonials" className="bg-muted/30">
          <SectionTitle>Nossos Clientes em Destaque</SectionTitle>
          <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto mb-12 md:mb-16">
            Ouça diretamente de quem transformou seus negócios com a parceria da EDCAP Consultoria. Resultados reais, histórias inspiradoras.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonialsData.map((testimonial) => (
              <VideoCard
                key={testimonial.id}
                title={testimonial.title}
                client={testimonial.client}
                videoId={testimonial.videoId}
                description={testimonial.description}
              />
            ))}
          </div>
        </Section>
      );
    };

    export default VideoTestimonialsSection;
  