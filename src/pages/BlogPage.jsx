
    import React, { useState, useMemo } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { useBlog } from '@/contexts/BlogContext';
    import { Search, Tag, CalendarDays } from 'lucide-react';

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

    const BlogPostCard = ({ post }) => (
      <motion.div 
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
            <img  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={post.title} src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
          </Link>
          <CardHeader>
            <CardTitle className="text-xl leading-tight group-hover:text-edcap-orange transition-colors">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground flex items-center space-x-2">
              <CalendarDays className="h-3 w-3" /> 
              <span>{new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <Tag className="h-3 w-3" />
              <span>{post.category}</span>
            </CardDescription>
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
    );

    const BlogPage = () => {
      const { posts } = useBlog();
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('');

      const categories = useMemo(() => {
        const allCategories = posts.map(post => post.category);
        return ['Todos', ...new Set(allCategories)];
      }, [posts]);

      const filteredPosts = useMemo(() => {
        return posts
          .filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
          )
          .filter(post => 
            selectedCategory === '' || selectedCategory === 'Todos' || post.category === selectedCategory
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }, [posts, searchTerm, selectedCategory]);

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PageHeader 
            title="Blog EDCAP"
            subtitle="Insights, tendências e estratégias para impulsionar o sucesso da sua empresa."
          />

          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="mb-10 md:flex md:items-center md:justify-between">
                <div className="relative mb-6 md:mb-0 md:w-1/2 lg:w-1/3">
                  <Input 
                    type="text"
                    placeholder="Buscar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-base py-3"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category || (category === 'Todos' && selectedCategory === '') ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category === 'Todos' ? '' : category)}
                      className={`text-sm px-3 py-1 h-auto transition-all ${
                        (selectedCategory === category || (category === 'Todos' && selectedCategory === '')) 
                        ? 'bg-edcap-orange text-white border-edcap-orange hover:bg-edcap-orange/90' 
                        : 'border-primary text-primary hover:bg-primary/10'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <img  class="mx-auto mb-6 w-48 h-48 opacity-50" alt="No results found illustration" src="https://images.unsplash.com/photo-1682624400764-d2c9eaeae972" />
                  <h3 className="text-2xl font-semibold text-primary mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar sua busca ou explore outras categorias.
                  </p>
                </div>
              )}
            </div>
          </section>
          
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold font-lato mb-4">Queremos ouvir você!</h2>
              <p className="text-lg text-blue-200 mb-8 max-w-xl mx-auto">
                Tem alguma sugestão de tema para nosso blog ou gostaria de ver um assunto específico abordado? Entre em contato!
              </p>
              <Button asChild size="lg" className="bg-edcap-orange hover:bg-edcap-orange/90 text-white">
                <Link to="/contato">Envie sua Sugestão</Link>
              </Button>
            </div>
          </section>
        </motion.div>
      );
    };

    export default BlogPage;
  