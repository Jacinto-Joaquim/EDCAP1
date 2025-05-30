
    import React, { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
    import { motion } from 'framer-motion';
    import { UserPlus, LogIn } from 'lucide-react';

    const AdminRegisterPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [fullName, setFullName] = useState('');
      const [role, setRole] = useState('');
      const [secretKey, setSecretKey] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const { register } = useAuth();
      const navigate = useNavigate();
      const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png";

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("As senhas não coincidem!"); // Replace with toast
          return;
        }
        setIsLoading(true);
        await register(email, password, role, secretKey, fullName);
        setIsLoading(false);
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
          <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-lato text-primary">Criar Conta no Painel</CardTitle>
              <CardDescription>Preencha os dados para se registrar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input id="fullName" type="text" placeholder="Seu nome completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-edcap-subtle-bg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-edcap-subtle-bg" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="Crie uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-edcap-subtle-bg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-edcap-subtle-bg" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Tipo de Conta</Label>
                    <Select onValueChange={setRole} value={role}>
                      <SelectTrigger className="w-full bg-edcap-subtle-bg">
                        <SelectValue placeholder="Selecione o tipo de conta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creator">Criador de Conteúdo</SelectItem>
                        <SelectItem value="manager">Gerenciador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secretKey">Chave Secreta</Label>
                    <Input id="secretKey" type="password" placeholder="Chave secreta da função" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} required className="bg-edcap-subtle-bg" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></motion.div>
                  ) : (
                    <UserPlus className="mr-2 h-5 w-5" />
                  )}
                  {isLoading ? 'Registrando...' : 'Registrar'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">Já tem uma conta?</p>
              <Button variant="link" asChild className="text-accent">
                <Link to="/painel-edcap-admin-s3cr3t0l0g1n">
                  <LogIn className="mr-2 h-4 w-4" /> Fazer Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default AdminRegisterPage;
  