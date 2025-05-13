
    import React, { useState, useEffect } from 'react';
    import { Link, NavLink, useLocation } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';
    import { Menu, X, CalendarCheck } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const NavItem = ({ to, children, onClick }) => {
      const location = useLocation();
      const isActive = location.pathname === to;

      return (
        <NavLink
          to={to}
          onClick={onClick}
          className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-edcap-orange ${isActive ? 'text-edcap-orange' : 'text-primary-foreground'}`}
        >
          {children}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-edcap-orange"
              layoutId="underline"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </NavLink>
      );
    };
    
    const MobileNavItem = ({ to, children, onClick }) => {
      const location = useLocation();
      const isActive = location.pathname === to;
       return (
        <NavLink
          to={to}
          onClick={onClick}
          className={`block px-4 py-3 text-base font-medium transition-colors duration-300 hover:bg-secondary hover:text-edcap-orange ${isActive ? 'text-edcap-orange bg-secondary' : 'text-primary-foreground'}`}
        >
          {children}
        </NavLink>
      );
    }

    const Header = () => {
      const [isScrolled, setIsScrolled] = useState(false);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { toast } = useToast();
      const [isModalOpen, setIsModalOpen] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/sobre', label: 'Sobre Nós' },
        { to: '/servicos', label: 'Serviços' },
        { to: '/cases', label: 'Cases de Sucesso' },
        { to: '/blog', label: 'Blog' },
        { to: '/contato', label: 'Contato' },
      ];

      const handleScheduleMeeting = (event) => {
        event.preventDefault();
        toast({
          title: "Agendamento Enviado!",
          description: "Sua solicitação de reunião foi enviada. Entraremos em contato em breve.",
          variant: "default",
        });
        setIsModalOpen(false);
      };
      
      const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
      const closeMobileMenu = () => setIsMobileMenuOpen(false);

      return (
        <>
          <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary shadow-lg py-3' : 'bg-primary/90 backdrop-blur-sm py-4'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="container mx-auto flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/55eba1e7a1514483f4fad51f97d0d117.jpg" alt="EDCAP Logo" className="h-10 md:h-12" />
                <span className="text-xl md:text-2xl font-lato font-bold text-primary-foreground hidden sm:block">EDCAP</span>
              </Link>
              <nav className="hidden lg:flex space-x-1 items-center">
                {navLinks.map((link) => (
                  <NavItem key={link.to} to={link.to}>{link.label}</NavItem>
                ))}
              </nav>
              <div className="flex items-center space-x-3">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="accent" size="lg" className="bg-edcap-orange hover:bg-edcap-orange/90 text-white hidden lg:flex items-center space-x-2 group">
                       <CalendarCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
                       <span>Agende uma Reunião</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[480px] bg-card">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-lato text-primary">Agendar uma Reunião</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Preencha o formulário abaixo e entraremos em contato para confirmar.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleScheduleMeeting} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-foreground">Nome</Label>
                        <Input id="name" placeholder="Seu nome completo" className="col-span-3 bg-background" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-foreground">Email</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" className="col-span-3 bg-background" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right text-foreground">Telefone</Label>
                        <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" className="col-span-3 bg-background" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="message" className="text-right text-foreground">Mensagem</Label>
                        <Textarea id="message" placeholder="Descreva brevemente o motivo do contato." className="col-span-3 bg-background" />
                      </div>
                      <Button type="submit" className="w-full mt-2 bg-edcap-orange hover:bg-edcap-orange/90 text-white">Enviar Solicitação</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <div className="lg:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-primary-foreground hover:text-edcap-orange">
                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.header>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-40 top-[68px] lg:hidden bg-primary/95 backdrop-blur-md"
              >
                <nav className="flex flex-col pt-4">
                  {navLinks.map((link) => (
                    <MobileNavItem key={link.to} to={link.to} onClick={closeMobileMenu}>{link.label}</MobileNavItem>
                  ))}
                  <div className="p-4 mt-4 border-t border-secondary">
                     <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="accent" size="lg" className="w-full bg-edcap-orange hover:bg-edcap-orange/90 text-white flex items-center space-x-2 group" onClick={() => { closeMobileMenu(); setIsModalOpen(true); }}>
                            <CalendarCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>Agende uma Reunião</span>
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`pt-${isScrolled ? '16' : '20'} md:pt-${isScrolled ? '20' : '24'}`}></div> {/* Spacer for fixed header */}
        </>
      );
    };

    export default Header;
  