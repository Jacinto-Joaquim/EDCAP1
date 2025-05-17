
    import React, { useEffect, useState } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
    import { Badge } from '@/components/ui/badge.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { CalendarDays, UserCircle, Tag, ArrowLeft, Edit, Trash2, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
    import { motion } from 'framer-motion';
    import SectionTitle from '@/components/shared/SectionTitle.jsx';
    import { useAuth } from '@/contexts/AuthContext.jsx';
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
    import { useToast } from "@/components/ui/use-toast.jsx";
    import { Helmet } from 'react-helmet-async';
    import '@/styles/quill-content.css';


    const BlogPostPage = () => {
      const { slug } = useParams();
      const { getPostBySlug, deletePost: deletePostFromContext, loading: blogLoading } = useBlog();
      const { user, userRole, isAuthenticated } = useAuth();
      const [post, setPost] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const fetchPost = async () => {
          setIsLoading(true);
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);
          setIsLoading(false);
        };
        if (slug) {
          fetchPost();
        }
      }, [slug, getPostBySlug]);

      const handleDelete = async () => {
        if (post) {
          await deletePostFromContext(post.id);
          toast({ title: "Post Deletado", description: "O post foi removido com sucesso.", variant: "destructive" });
        }
      };

      if (isLoading || blogLoading) {
        return (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
             <Helmet><title>Carregando Post... | EDCAP Consultoria</title></Helmet>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            <p className="ml-3 text-lg text-primary">Carregando post...</p>
          </div>
        );
      }

      if (!post) {
        return (
          <div className="text-center py-20">
            <Helmet><title>Post Não Encontrado | EDCAP Consultoria</title></Helmet>
            <img  src="/placeholder-not-found.svg" alt="Post não encontrado" className="mx-auto mb-6 h-48 w-48 text-muted-foreground" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
            <h1 className="text-3xl font-bold text-primary mb-4">Post Não Encontrado</h1>
            <p className="text-muted-foreground mb-6">O artigo que você está procurando não existe ou foi movido.</p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Blog</Link>
            </Button>
          </div>
        );
      }

      const postDate = post.date ? new Date(post.date) : new Date();
      const formattedDate = postDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
      const canEditOrDelete = isAuthenticated && (userRole === 'manager' || (userRole === 'creator' && post.authorId === user.id));

      const authorSocialLinks = [
        { platform: 'linkedin', url: post.profiles?.social_linkedin, icon: <Linkedin className="h-5 w-5" /> },
        { platform: 'twitter', url: post.profiles?.social_twitter, icon: <Twitter className="h-5 w-5" /> },
        { platform: 'facebook', url: post.profiles?.social_facebook, icon: <Facebook className="h-5 w-5" /> },
        { platform: 'instagram', url: post.profiles?.social_instagram, icon: <Instagram className="h-5 w-5" /> },
      ].filter(link => link.url);


      return (
        <>
          <Helmet>
            <title>{post.title}</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://www.edcapconsultoria.co.ao/blog/${post.slug}`} />
            {post.image_url && <meta property="og:image" content={post.image_url} />}
            {post.image_alt && <meta property="og:image:alt" content={post.image_alt} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt} />
            {post.image_url && <meta name="twitter:image" content={post.image_url} />}
            <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": "${post.title.replace(/"/g, '\\"')}",
                "image": "${post.image_url || 'https://www.edcapconsultoria.co.ao/placeholder-logo.png'}",
                "author": {
                  "@type": "Person",
                  "name": "${post.authorName || 'EDCAP Consultoria'}"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "EDCAP Consultoria",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png"
                  }
                },
                "datePublished": "${new Date(post.published_at || post.created_at).toISOString()}",
                "dateModified": "${new Date(post.updated_at || post.created_at).toISOString()}",
                "description": "${post.excerpt.replace(/"/g, '\\"')}",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.edcapconsultoria.co.ao/blog/${post.slug}"
                }
              }
            `}
            </script>
          </Helmet>
          <div className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/5">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <header className="mb-8 md:mb-12">
                  <div className="mb-6">
                    <Button variant="outline" asChild className="text-sm text-primary hover:bg-primary/5 border-primary/50">
                      <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Blog</Link>
                    </Button>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-lato font-bold text-primary leading-tight mb-4">{post.title}</h1>
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-2 sm:space-x-4 mb-4">
                    <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5" /> {formattedDate}</span>
                    <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1.5" /> Por {post.authorName || 'EDCAP Team'}</span>
                    {post.category && <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5" /> {post.category}</span>}
                  </div>
                  {post.image_url && (
                    <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-lg my-6 border border-border">
                      <img  src={post.image_url} alt={post.image_alt || post.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                    </div>
                  )}
                  {canEditOrDelete && (
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" asChild className="text-primary border-primary hover:bg-primary/5">
                        <Link to={`/painel/posts/editar/${post.id}`}><Edit className="mr-2 h-4 w-4" /> Editar</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructiveOutline" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Deletar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Deletar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </header>

                <div 
                  className="prose prose-lg lg:prose-xl max-w-none quill-content text-foreground" 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-primary mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-sm bg-muted text-muted-foreground hover:bg-muted/80">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {post.profiles && (
                  <aside className="mt-12 pt-8 border-t border-border bg-card p-6 rounded-lg shadow-md">
                    <SectionTitle title="Sobre o Autor" subtitle="" className="text-left mb-4 !text-xl" />
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Avatar className="h-20 w-20 text-lg border-2 border-accent">
                        <AvatarImage src={post.authorProfileImageUrl} alt={post.authorName} />
                        <AvatarFallback>{post.authorName ? post.authorName.split(' ').map(n=>n[0]).join('').toUpperCase() : 'A'}</AvatarFallback>
                      </Avatar>
                      <div className="text-center sm:text-left">
                        <h4 className="text-xl font-semibold text-primary">{post.authorName}</h4>
                        {post.authorRole && <p className="text-sm text-accent font-medium">{post.authorRole === 'manager' ? 'Gerente' : 'Criador de Conteúdo'}</p>}
                        {post.authorBio && <p className="mt-2 text-sm text-muted-foreground">{post.authorBio}</p>}
                        {post.authorEducation && <p className="mt-1 text-xs text-muted-foreground"><strong>Formação:</strong> {post.authorEducation}</p>}
                        {post.authorExperience && <p className="mt-1 text-xs text-muted-foreground"><strong>Experiência:</strong> {post.authorExperience}</p>}
                        {authorSocialLinks.length > 0 && (
                          <div className="mt-3 flex justify-center sm:justify-start space-x-3">
                            {authorSocialLinks.map(link => (
                              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label={`Perfil de ${post.authorName} no ${link.platform}`}>
                                {link.icon}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </aside>
                )}
              </motion.article>
            </div>
          </div>
        </>
      );
    };

    export default BlogPostPage;
  