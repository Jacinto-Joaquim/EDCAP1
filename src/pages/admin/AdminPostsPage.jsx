
    import React, { useState, useEffect, useCallback } from 'react';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import { PlusCircle, Edit3, Trash2, Eye, CheckCircle, XCircle, Loader2 } from 'lucide-react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import {
      AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
      AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
    } from "@/components/ui/alert-dialog.jsx";
    import { motion } from 'framer-motion';

    const AdminPostsPage = () => {
      const { posts, deletePost, updatePost, fetchPosts, loading: blogLoading } = useBlog();
      const { user, userRole } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();

      const [filteredPosts, setFilteredPosts] = useState([]);
      const [pageLoading, setPageLoading] = useState(true);

      useEffect(() => {
        setPageLoading(true);
        fetchPosts().then(() => {
          setPageLoading(false);
        });
      }, [fetchPosts]);

      useEffect(() => {
        if (userRole === 'manager') {
          setFilteredPosts(posts);
        } else if (userRole === 'creator' && user) {
          setFilteredPosts(posts.filter(post => post.user_id === user.id));
        } else {
          setFilteredPosts([]);
        }
      }, [posts, user, userRole]);

      const handleDelete = async (postId) => {
        const postToDelete = posts.find(p => p.id === postId);
        await deletePost(postId);
        toast({ title: "Sucesso!", description: `Post "${postToDelete?.title || 'Selecionado'}" deletado.`, variant: "destructive" });
      };

      const toggleApproval = async (post) => {
        const updatedPostData = { ...post, approved: !post.approved };
        if (updatedPostData.approved && !updatedPostData.published_at) {
            updatedPostData.published_at = new Date().toISOString();
        }
        await updatePost(updatedPostData);
        toast({ 
          title: "Status Alterado", 
          description: `Post "${post.title}" ${updatedPostData.approved ? 'aprovado' : 'reprovado'}.`,
          variant: "default"
        });
      };
      
      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
            duration: 0.3,
          },
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
      };

      if (pageLoading || blogLoading) {
        return (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-primary font-semibold">Carregando posts...</p>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Gerenciar Posts</h1>
              <p className="text-muted-foreground">Visualize, edite, aprove ou delete posts do blog.</p>
            </div>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/painel/posts/novo">
                <PlusCircle className="h-5 w-5 mr-2" /> Novo Post
              </Link>
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Lista de Posts</CardTitle>
              <CardDescription>
                {userRole === 'manager' ? 'Todos os posts cadastrados no sistema.' : 'Seus posts criados.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPosts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhum post encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Título</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Autor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data Publicação</th>
                        {userRole === 'manager' && <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>}
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {filteredPosts.map((post, index) => (
                        <motion.tr 
                          key={post.id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-primary hover:text-accent transition-colors">
                                <Link to={`/painel/posts/editar/${post.id}`}>{post.title}</Link>
                            </div>
                            <div className="text-xs text-muted-foreground">{post.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.authorName || post.profiles?.full_name || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : 'Não Publicado'}</td>
                          {userRole === 'manager' && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.approved ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning-foreground'}`}>
                                {post.approved ? 'Aprovado' : 'Pendente'}
                              </span>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                            <Button variant="ghost" size="icon" asChild className="text-primary hover:text-accent disabled:opacity-50" disabled={!post.approved}>
                              <Link to={`/blog/${post.slug}`} target="_blank" title="Ver Post"><Eye className="h-4 w-4" /></Link>
                            </Button>
                            {(userRole === 'manager' || (userRole === 'creator' && post.user_id === user?.id)) && (
                              <Button variant="ghost" size="icon" onClick={() => navigate(`/painel/posts/editar/${post.id}`)} className="text-primary hover:text-accent" title="Editar Post">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            )}
                            {userRole === 'manager' && (
                              <Button variant="ghost" size="icon" onClick={() => toggleApproval(post)} className={post.approved ? "text-warning hover:text-warning/80" : "text-success hover:text-success/80"} title={post.approved ? "Reprovar" : "Aprovar"}>
                                {post.approved ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                              </Button>
                            )}
                             {(userRole === 'manager' || (userRole === 'creator' && post.user_id === user?.id)) && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Deletar Post">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o post "{post.title}"? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive hover:bg-destructive/90">
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                             )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    };

    export default AdminPostsPage;
  