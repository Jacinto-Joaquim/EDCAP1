
    import React, { useState, useEffect } from 'react';
    import { useNavigate, Link, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { motion } from 'framer-motion';
    import { LogIn, UserPlus } from 'lucide-react';

    const AdminLoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const { login, loading, isAuthenticated } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/painel/dashboard";
      const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png";

      // Redirecionar se já estiver autenticado
      useEffect(() => {
        if (isAuthenticated) {
          navigate('/painel/dashboard', { replace: true });
        }
      }, [isAuthenticated, navigate]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const success = await login(email, password);
          if (success) {
            // Aguardar um momento para garantir que o estado seja atualizado
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 300);
          }
        } catch (error) {
          console.error("Login page submit error:", error);
        }
      };

      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-edcap-cta-blue p-4"
        >
          <Link to="/" className="mb-8">
            <img src={newLogoUrl} alt="EDCAP Consultoria Logo" className="h-16" />
          </Link>
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-lato text-primary">Acesso ao Painel</CardTitle>
              <CardDescription>Entre com suas credenciais para gerenciar o conteúdo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-edcap-subtle-bg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-edcap-subtle-bg"
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={loading}>
                  {loading ? (
                    <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></motion.div>
                  ) : (
                    <LogIn className="mr-2 h-5 w-5" />
                  )}
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">Não tem uma conta?</p>
              <Button variant="link" asChild className="text-accent">
                <Link to="/painel-edcap-admin-r3g1str0">
                  <UserPlus className="mr-2 h-4 w-4" /> Criar uma conta
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default AdminLoginPage;
  