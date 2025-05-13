
    import React, { useEffect, useState } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { ArrowLeft, CalendarDays, User, Tag, Share2, Edit, Trash2 } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog.jsx";

    const BlogPostPage = () => {
      const { postId: postSlug } = useParams();
      const { getPostBySlug, getRecentPosts, deletePost } = useBlog();
      const [post, setPost] = useState(null);
      const { toast } = useToast();
      const navigate = useNavigate();
      
      const isAdmin = true; 

      useEffect(() => {
        const foundPost = getPostBySlug(postSlug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          navigate('/404'); 
        }
      }, [postSlug, getPostBySlug, navigate]);

      if (!post) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        );
      }

      const recentPosts = getRecentPosts(3).filter(p => p.id !== post.id);

      const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copiado!",
          description: "O link do artigo foi copiado para sua área de transferência.",
        });
      };

      const handleDelete = () => {
        deletePost(post.id);
        toast({
          title: "Post Deletado!",
          description: `O post "${post.title}" foi deletado com sucesso.`,
          variant: "destructive",
        });
        navigate('/blog');
      };

      return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="bg-background"
        >
          <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
            <img  className="absolute inset-0 w-full h-full object-cover" alt={post.title} src="https://images.unsplash.com/photo-1679521358679-301c295e2cd4" />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="container mx-auto px-4 relative z-10 flex flex-col justify-end h-full pb-12 md:pb-16">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold font-lato text-white mb-3 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {post.title}
              </motion.h1>
              <motion.div 
                className="flex flex-wrap items-center text-sm text-gray-300 space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5" /> {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center"><User className="h-4 w-4 mr-1.5" /> {post.author}</span>
                <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5" /> {post.category}</span>
              </motion.div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <article className="lg:col-span-8 prose prose-lg max-w-none prose-headings:font-lato prose-headings:text-primary prose-a:text-edcap-orange hover:prose-a:text-edcap-green prose-img:rounded-md prose-img:shadow-md">
                <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
                
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t">
                    <h4 className="text-lg font-semibold mb-3 text-primary">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-edcap-orange/10 text-edcap-orange text-xs font-medium rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <aside className="lg:col-span-4 space-y-8">
                <div className="p-6 bg-gray-50 rounded-lg shadow">
                  <h3 className="text-xl font-semibold font-lato text-primary mb-4">Sobre o Autor</h3>
                  <div className="flex items-center mb-3">
                    <img  className="w-16 h-16 rounded-full mr-4 object-cover" alt={post.author} src="https://images.unsplash.com/photo-1665113361900-b9720957d41a" />
                    <div>
                      <p className="font-semibold text-gray-800">{post.author}</p>
                      <p className="text-xs text-muted-foreground">Especialista na EDCAP</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.author} é um consultor experiente na EDCAP, com vasta experiência em {post.category.toLowerCase()}.
                  </p>
                </div>
                
                {isAdmin && (
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow">
                    <h3 className="text-xl font-semibold font-lato text-yellow-700 mb-4">Ações de Administrador</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild variant="outline" className="flex-1 border-yellow-600 text-yellow-700 hover:bg-yellow-100">
                        <Link to={`/admin?edit=${post.id}`} className="w-full">
                          <Edit className="h-4 w-4 mr-2" /> Editar Post
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="flex-1">
                            <Trash2 className="h-4 w-4 mr-2" /> Deletar Post
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente o post "{post.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                              Sim, deletar post
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}

                <div className="p-6 bg-gray-50 rounded-lg shadow">
                  <h3 className="text-xl font-semibold font-lato text-primary mb-4">Compartilhe este Artigo</h3>
                  <Button onClick={handleShare} variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    <Share2 className="h-4 w-4 mr-2" /> Copiar Link
                  </Button>
                </div>

                {recentPosts.length > 0 && (
                  <div className="p-6 bg-gray-50 rounded-lg shadow">
                    <h3 className="text-xl font-semibold font-lato text-primary mb-4">Artigos Recentes</h3>
                    <ul className="space-y-4">
                      {recentPosts.map(recentPost => (
                        <li key={recentPost.id}>
                          <Link to={`/blog/${recentPost.slug}`} className="group">
                            <h4 className="font-semibold text-gray-800 group-hover:text-edcap-orange transition-colors leading-tight mb-1">{recentPost.title}</h4>
                            <p className="text-xs text-muted-foreground">{new Date(recentPost.date).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' })}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="p-6 bg-primary text-primary-foreground rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold font-lato mb-3">Precisa de Ajuda Especializada?</h3>
                  <p className="text-sm text-blue-200 mb-4">
                    A EDCAP Consultoria pode ajudar sua empresa a superar desafios e alcançar novos patamares.
                  </p>
                  <Button asChild variant="accent" className="w-full bg-edcap-orange hover:bg-edcap-orange/90 text-white">
                    <Link to="/contato">Fale Conosco</Link>
                  </Button>
                </div>

              </aside>
            </div>
            <div className="mt-12 md:mt-16 text-center">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o Blog
                </Link>
              </Button>
            </div>
          </div>
          
          <div id="adsense-placeholder-top" className="container mx-auto my-8 text-center text-muted-foreground bg-gray-100 p-4 rounded">
            [Espaço reservado para publicidade - Topo do Artigo]
          </div>
           <div id="adsense-placeholder-bottom" className="container mx-auto my-8 text-center text-muted-foreground bg-gray-100 p-4 rounded">
            [Espaço reservado para publicidade - Fim do Artigo]
          </div>

        </motion.div>
      );
    };

    export default BlogPostPage;
  