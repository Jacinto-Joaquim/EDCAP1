
    import React, { useState } from 'react';
    import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.jsx';
    import { Menu, X, LayoutDashboard, FileText, Users, Settings, LogOut, Briefcase, UserCircle } from 'lucide-react';

    const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png";

    const AdminSidebar = ({ userRole, onLinkClick }) => {
      const commonLinks = [
        { name: 'Dashboard', path: '/painel/dashboard', icon: LayoutDashboard },
        { name: 'Posts', path: '/painel/posts', icon: FileText },
        { name: 'Configurações da Conta', path: '/painel/configuracoes-conta', icon: UserCircle },
      ];
      const managerLinks = [
        { name: 'Usuários', path: '/painel/usuarios', icon: Users },
      ];

      let links = userRole === 'manager' ? [...commonLinks, ...managerLinks] : commonLinks;
      
      links = links.sort((a,b) => a.name.localeCompare(b.name)); // Sort links alphabetically

      const linkClass = "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors";
      const activeClass = "bg-accent text-accent-foreground hover:bg-accent/90";
      const inactiveClass = "text-secondary hover:bg-muted hover:text-primary";

      return (
        <nav className="flex flex-col space-y-1 p-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={onLinkClick}
              end={link.path === '/painel/dashboard'} // Ensure exact match for dashboard
              className={({ isActive }) => `${linkClass} ${isActive ? activeClass : inactiveClass}`}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      );
    };
    
    const AdminLayout = () => {
      const { user, logout, userRole } = useAuth();
      const navigate = useNavigate();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      if (!user) {
        return null; 
      }
      
      return (
        <div className="flex flex-1 md:grid md:grid-cols-[260px_1fr] h-full"> {/* h-full for main content area */}
            <aside className="hidden md:block w-[260px] border-r bg-background p-4 fixed top-16 bottom-0 left-0 overflow-y-auto"> {/* Fixed sidebar */}
              <AdminSidebar userRole={userRole} />
            </aside>
            <main className="flex-1 p-6 md:p-8 overflow-y-auto md:ml-[260px]"> {/* Margin for fixed sidebar */}
              <Outlet />
            </main>
          </div>
      );
    };

    export default AdminLayout;
  