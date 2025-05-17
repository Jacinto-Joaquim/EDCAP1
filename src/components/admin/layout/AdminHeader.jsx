
    import React, { useState } from 'react';
    import { Link, useNavigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
    import { Menu, X, LayoutDashboard, FileText, Users, LogOut, Briefcase, UserCircle } from 'lucide-react';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';

    const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png";

    const AdminMobileSidebar = ({ userRole, onLinkClick }) => {
      const location = useLocation(); 
      const commonLinks = [
        { name: 'Dashboard', path: '/painel/dashboard', icon: LayoutDashboard },
        { name: 'Posts', path: '/painel/posts', icon: FileText },
        { name: 'Configurações da Conta', path: '/painel/configuracoes-conta', icon: UserCircle },
      ];
      const managerLinks = [
        { name: 'Usuários', path: '/painel/usuarios', icon: Users },
      ];
      let links = userRole === 'manager' ? [...commonLinks, ...managerLinks] : commonLinks;
      links = links.sort((a,b) => a.name.localeCompare(b.name));

      const linkClass = "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors";
      const activeClass = "bg-accent text-accent-foreground hover:bg-accent/90";
      const inactiveClass = "text-secondary hover:bg-muted hover:text-primary";

      return (
        <nav className="flex flex-col space-y-1 p-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (location.pathname.startsWith(link.path) && link.path !== '/painel/dashboard');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={onLinkClick}
                className={`${linkClass} ${isActive ? activeClass : inactiveClass}`}
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      );
    };

    const AdminHeader = () => {
      const { user, logout, userRole } = useAuth();
      const navigate = useNavigate();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      const handleLogout = () => {
        logout();
        navigate('/painel-edcap-admin-s3cr3t0l0g1n');
      };

      if (!user) return null;

      const userInitial = user.authorName ? user.authorName.substring(0, 2).toUpperCase() : user.email.substring(0,2).toUpperCase();


      return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 shadow-sm">
            <div className="flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden mr-4">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <div className="flex items-center justify-between p-4 border-b">
                     <Link to="/painel/dashboard" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                        <img src={newLogoUrl} alt="EDCAP Logo" className="h-8 mr-2" />
                        <span className="font-semibold text-lg text-primary">Painel</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <AdminMobileSidebar userRole={userRole} onLinkClick={() => setMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>
              <Link to="/painel/dashboard" className="hidden md:flex items-center">
                <img src={newLogoUrl} alt="EDCAP Logo" className="h-10 mr-3" />
                <span className="font-semibold text-xl text-primary">Painel Administrativo</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Briefcase className="h-4 w-4 mr-2" /> Ver Site
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                       {user.profileImageUrl ? (
                        <AvatarImage src={user.profileImageUrl} alt={user.authorName || user.email} />
                       ) : (
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png?text=${userInitial}`} alt={user.authorName || user.email} />
                       )}
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-primary">{user.authorName || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.role === 'manager' ? 'Gerenciador' : 'Criador de Conteúdo'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/painel/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/painel/configuracoes-conta')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Configurações da Conta</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
      );
    };
    export default AdminHeader;
  