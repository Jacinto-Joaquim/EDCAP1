
    import React, { useState, useEffect } from 'react';
    import { Link, NavLink, useLocation } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Menu, X, Briefcase, Users, BarChart2, FileText, MessageSquare, CalendarDays, Home } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext.jsx';

    const navLinks = [
      { name: 'Home', path: '/', icon: <Home className="h-5 w-5 md:hidden" /> },
      { name: 'Sobre', path: '/sobre', icon: <Users className="h-5 w-5 md:hidden" /> },
      { name: 'Serviços', path: '/servicos', icon: <Briefcase className="h-5 w-5 md:hidden" /> },
      { name: 'Cases', path: '/cases', icon: <BarChart2 className="h-5 w-5 md:hidden" /> },
      { name: 'Blog', path: '/blog', icon: <FileText className="h-5 w-5 md:hidden" /> },
      { name: 'Contato', path: '/contato', icon: <MessageSquare className="h-5 w-5 md:hidden" /> },
    ];

    const Header = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const location = useLocation();
      const { user, logout } = useAuth();

      const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/ed5af9e2c44f717f1a31e4fcfe277b8e.png";

      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        setIsOpen(false); 
      }, [location.pathname]);

      const toggleMenu = () => setIsOpen(!isOpen);

      const linkClass = ({ isActive }) =>
        `relative font-medium pb-1 transition-colors duration-300 hover:text-accent ${
          isActive ? 'text-accent after:w-full' : `${isScrolled || isOpen ? 'text-primary-foreground/90 hover:text-accent' : 'text-secondary hover:text-accent'}`
        } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
        }`;

      const mobileLinkClass = ({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 text-lg rounded-md transition-colors duration-200 ${
          isActive ? 'bg-accent/10 text-accent font-semibold' : 'text-primary-foreground/90 hover:bg-accent/5 hover:text-accent'
        }`;
        
      const logoTextColorClass = isScrolled || isOpen ? 'text-primary-foreground' : 'text-primary';

      return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-primary shadow-lg' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={newLogoUrl} 
                  alt="EDCAP Consultoria Logo" 
                  className="h-10 md:h-12 transition-all duration-300 block" 
                />
                <span className={`hidden lg:block text-2xl font-bold font-lato tracking-tight ${logoTextColorClass}`}>
                  EDCAP
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map(link => (
                  <NavLink key={link.name} to={link.path} className={linkClass}>
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className="hidden md:flex items-center space-x-3">
                {user ? (
                  <>
                    <Button variant={isScrolled || isOpen ? "outline" : "secondary"} asChild className={isScrolled || isOpen ? "border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10" : ""}>
                      <Link to="/painel-edcap-admin-s3cr3t0l0g1n">Painel</Link>
                    </Button>
                    <Button onClick={logout} variant="destructive">Sair</Button>
                  </>
                ) : (
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                    <Link to="/contato?agendar=true">
                      Agende uma Reunião
                      <CalendarDays className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                    </Link>
                  </Button>
                )}
              </div>

              <div className="md:hidden">
                <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Abrir menu" className={isScrolled || isOpen ? "text-primary-foreground hover:bg-primary-foreground/10" : "text-primary hover:bg-primary/10"}>
                  {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-primary shadow-lg absolute top-full left-0 right-0 overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }} 
              >
                <nav className="flex flex-col space-y-2 p-4">
                  {navLinks.map(link => (
                    <NavLink key={link.name} to={link.path} className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      {React.cloneElement(link.icon, { className: "h-5 w-5 text-primary-foreground/90"})}
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                  <hr className="my-2 border-primary-foreground/20" />
                  {user ? (
                    <>
                       <Button variant="outline" asChild className="w-full justify-start py-3 text-lg border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
                        <Link to="/painel-edcap-admin-s3cr3t0l0g1n" onClick={() => setIsOpen(false)}>
                          <Briefcase className="h-5 w-5 mr-3" /> Painel Admin
                        </Link>
                      </Button>
                      <Button onClick={() => { logout(); setIsOpen(false); }} variant="destructive" className="w-full justify-start py-3 text-lg">
                        <X className="h-5 w-5 mr-3" /> Sair
                      </Button>
                    </>
                  ) : (
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg group">
                      <Link to="/contato?agendar=true" onClick={() => setIsOpen(false)}>
                        <CalendarDays className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                        Agende uma Reunião
                      </Link>
                    </Button>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      );
    };

    export default Header;
  