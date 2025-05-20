
    import React from 'react';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Link } from 'react-router-dom';
    import { FileText, Users, PlusCircle, Eye } from 'lucide-react';
    import { motion } from 'framer-motion';

    const StatCard = ({ title, value, icon, link, linkText, color }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`shadow-lg border-l-4 ${color}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
            {React.cloneElement(icon, { className: "h-5 w-5 text-muted-foreground" })}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{value}</div>
            {link && (
              <Button variant="link" asChild className="px-0 text-sm text-accent hover:text-accent/80">
                <Link to={link}>{linkText} <Eye className="ml-1 h-4 w-4" /></Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );

    const AdminDashboardPage = () => {
      const { user, loading: authLoading } = useAuth();
      const { posts, loading: blogLoading } = useBlog();

      if (authLoading || blogLoading || !user || !posts) {
        return (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3">Carregando dashboard...</p>
        </div>
        );
      }

      const userPosts = posts?.filter(post => post.user_id && user?.id && post.user_id === user.id) || [];

      return (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-primary">Bem-vindo(a) ao Painel, {user.email}!</h1>
            <p className="text-muted-foreground">Aqui você pode gerenciar o conteúdo do blog EDCAP Consultoria.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard 
              title="Total de Posts" 
              value={posts.length} 
              icon={<FileText />} 
              link="/painel/posts"
              linkText="Ver todos os posts"
              color="border-edcap-cta-blue"
            />
            {user.role === 'manager' && (
              <StatCard 
                title="Total de Usuários" 
                value={allUsers.length} 
                icon={<Users />} 
                link="/painel/usuarios"
                linkText="Gerenciar usuários"
                color="border-edcap-confirm-green"
              />
            )}
            {user.role === 'creator' && (
               <StatCard 
                title="Seus Posts Criados" 
                value={userPosts.length} 
                icon={<FileText />} 
                link="/painel/posts"
                linkText="Ver seus posts"
                color="border-edcap-warning-orange"
              />
            )}
             <StatCard 
                title="Novo Post" 
                value={<PlusCircle className="h-8 w-8 text-accent"/>} 
                icon={<PlusCircle />} 
                link="/painel/posts/novo"
                linkText="Criar novo post"
                color="border-accent"
              />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Ações Rápidas</CardTitle>
                <CardDescription>Acesse rapidamente as funcionalidades mais importantes.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="justify-start text-base py-6 border-primary hover:bg-primary/5">
                  <Link to="/painel/posts/novo">
                    <PlusCircle className="mr-3 h-5 w-5 text-accent" /> Criar Novo Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start text-base py-6 border-primary hover:bg-primary/5">
                  <Link to="/painel/posts">
                    <FileText className="mr-3 h-5 w-5 text-edcap-cta-blue" /> Gerenciar Posts
                  </Link>
                </Button>
                {user.role === 'manager' && (
                  <Button asChild variant="outline" className="justify-start text-base py-6 border-primary hover:bg-primary/5">
                    <Link to="/painel/usuarios">
                      <Users className="mr-3 h-5 w-5 text-edcap-confirm-green" /> Gerenciar Usuários
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Placeholder for future charts or more detailed stats */}
        </div>
      );
    };

    export default AdminDashboardPage;
  