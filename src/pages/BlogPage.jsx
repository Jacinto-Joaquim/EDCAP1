
    import React, { useState, useMemo } from 'react';
    import { Link } from 'react-router-dom';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Badge } from '@/components/ui/badge.jsx';
    import { motion } from 'framer-motion';
    import { CalendarDays, UserCircle, Tag, Search, ArrowRight } from 'lucide-react';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { Helmet } from 'react-helmet-async';

    const BlogPostCard = ({ post }) => {
      const postDate = post.date ? new Date(post.date) : new Date();
      const formattedDate = postDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col flex-grow bg-card border-border">
            {post.image_url && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img  src={post.image_url} alt={post.image_alt || post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"  />
              </div>
            )}
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-lato font-bold text-primary hover:text-accent transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground space-x-3 pt-1">
                <span className="flex items-center"><CalendarDays className="h-3.5 w-3.5 mr-1" /> {formattedDate}</span>
                <span className="flex items-center"><UserCircle className="h-3.5 w-3.5 mr-1" /> {post.authorName || 'EDCAP Team'}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-4">
              <CardDescription className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</CardDescription>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80">
                      <Tag className="h-3 w-3 mr-1" />{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="text-accent hover:text-accent/80 px-0">
                <Link to={`/blog/${post.slug}`}>Ler Mais <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    const BlogPage = () => {
      const { posts, loading } = useBlog();
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('');

      const categories = useMemo(() => {
        const allCategories = posts.reduce((acc, post) => {
          if (post.category && !acc.includes(post.category)) {
            acc.push(post.category);
          }
          return acc;
        }, []);
        return ['Todas', ...allCategories.sort()];
      }, [posts]);

      const filteredPosts = useMemo(() => {
        return posts
          .filter(post => post.approved)
          .filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
          )
          .filter(post => 
            selectedCategory === '' || selectedCategory === 'Todas' || post.category === selectedCategory
          );
      }, [posts, searchTerm, selectedCategory]);

      if (loading && posts.length === 0) {
        return (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            <p className="ml-3 text-lg text-primary">Carregando posts...</p>
          </div>
        );
      }

      return (
        <>
        <Helmet>
            <title>Blog - Notícias e Insights</title>
            <meta name="description" content="Acompanhe as últimas notícias, artigos e insights da EDCAP Consultoria sobre gestão, negócios e o mercado em Angola." />
             <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "Blog",
                  "name": "Blog EDCAP Consultoria",
                  "description": "Artigos e insights sobre consultoria e gestão empresarial em Angola.",
                  "url": "https://www.edcapconsultoria.co.ao/blog",
                  "publisher": {
                    "@type": "Organization",
                    "name": "EDCAP Consultoria",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png"
                    }
                  }
                }
              `}
            </script>
        </Helmet>
        <div className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Nosso Blog"
              subtitle="Mantenha-se atualizado com as últimas notícias, artigos e insights da EDCAP Consultoria."
              className="text-center mb-12 md:mb-16"
            />

            <div className="mb-10 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="relative md:col-span-2">
                <Input 
                  type="text"
                  placeholder="Pesquisar artigos, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base bg-input border-border focus:border-accent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 text-base bg-input border-border rounded-md focus:ring-accent focus:border-accent"
                  aria-label="Selecionar categoria"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <img alt="Nenhum post encontrado" className="mx-auto mb-6 h-40 w-40 text-muted-foreground" src="https://images.unsplash.com/photo-1625708974337-fb8fe9af5711" />
                <p className="text-xl text-primary font-semibold mb-2">Nenhum post encontrado</p>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou categoria. Novos conteúdos são adicionados regularmente!
                </p>
              </motion.div>
            )}
          </div>
        </div>
        </>
      );
    };

    export default BlogPage;
  