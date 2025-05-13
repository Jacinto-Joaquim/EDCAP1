
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Link } from 'react-router-dom';
    import { Lightbulb } from 'lucide-react';
    import { useBlog } from '@/contexts/BlogContext';
    import Section from '@/components/shared/Section.jsx';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';

    const RecentBlogPostsSection = () => {
      const { getRecentPosts } = useBlog();
      const recentPosts = getRecentPosts(4);

      if (!recentPosts || recentPosts.length === 0) {
        return (
          <Section className="bg-gray-50" id="blog">
            <SectionTitle>Fique por Dentro</SectionTitle>
            <p className="text-center text-muted-foreground">Nenhum artigo publicado recentemente. Volte em breve!</p>
          </Section>
        );
      }

      return (
        <Section className="bg-gray-50" id="blog">
          <SectionTitle>Fique por Dentro: Nosso Blog</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentPosts.map(post => (
              <motion.div key={post.id} whileHover={{ y: -5 }} className="h-full">
                <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                    <img  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={post.title} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight h-16 line-clamp-2 group-hover:text-edcap-orange transition-colors">
                       <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })} - {post.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button asChild variant="link" className="text-edcap-orange p-0">
                      <Link to={`/blog/${post.slug}`}>Ler Artigo Completo &rarr;</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
              <Link to="/blog">
                Visitar Nosso Blog
                <Lightbulb className="ml-2 h-5 w-5 group-hover:animate-ping" />
              </Link>
            </Button>
          </div>
        </Section>
      );
    };

    export default RecentBlogPostsSection;
  