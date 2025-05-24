    import React, { Suspense, lazy, useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
    import { AnimatePresence, motion } from 'framer-motion';
    import Header from '@/components/layout/Header.jsx';
    import Footer from '@/components/layout/Footer.jsx';
    import AdminHeader from '@/components/admin/layout/AdminHeader.jsx';
    import AdminFooter from '@/components/admin/layout/AdminFooter.jsx';
    import CookieConsentBanner from '@/components/shared/CookieConsentBanner.jsx';
    import { Toaster } from '@/components/ui/toaster.jsx';
    import { BlogProvider } from '@/contexts/BlogContext.jsx';
    import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
    import { Helmet, HelmetProvider } from 'react-helmet-async';

    const HomePage = lazy(() => import('@/pages/HomePage.jsx'));
    const SobrePage = lazy(() => import('@/pages/SobrePage.jsx'));
    const ServicosPage = lazy(() => import('@/pages/ServicosPage.jsx'));
    const CasesPage = lazy(() => import('@/pages/CasesPage.jsx'));
    const BlogPage = lazy(() => import('@/pages/BlogPage.jsx'));
    const BlogPostPage = lazy(() => import('@/pages/BlogPostPage.jsx'));
    const ContatoPage = lazy(() => import('@/pages/ContatoPage.jsx'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'));
    const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage.jsx'));
    const CarreirasPage = lazy(() => import('@/pages/CarreirasPage.jsx'));
    const FaqsPage = lazy(() => import('@/pages/FaqsPage.jsx'));
    const TermosDeUsoPage = lazy(() => import('@/pages/TermosDeUsoPage.jsx'));

    const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage.jsx'));
    const AdminRegisterPage = lazy(() => import('@/pages/admin/AdminRegisterPage.jsx'));
    const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout.jsx'));
    const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage.jsx'));
    const AdminPostsPage = lazy(() => import('@/pages/admin/AdminPostsPage.jsx'));
    const AdminPostEditorPage = lazy(() => import('@/pages/admin/AdminPostEditorPage.jsx'));
    const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage.jsx'));
    const AdminAccountSettingsPage = lazy(() => import('@/pages/admin/AdminAccountSettingsPage.jsx'));


    const PageTransitionWrapper = ({ children }) => {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
    };
    
    const LoadingFallback = () => (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <Helmet>
            <title>Carregando... | EDCAP Consultoria</title>
        </Helmet>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
        <p className="ml-4 text-lg text-accent font-semibold">Carregando...</p>
      </div>
    );

    const ProtectedRoute = ({ children, allowedRoles }) => {
      const { isAuthenticated, userRole, loading, user } = useAuth();
      const location = useLocation();
      const [checkingAuth, setCheckingAuth] = useState(true);
      
      useEffect(() => {
        // Dar tempo para que a autenticação seja verificada corretamente
        const timer = setTimeout(() => {
          setCheckingAuth(false);
        }, 500);
        
        return () => clearTimeout(timer);
      }, []);

      if (loading || checkingAuth) {
        console.log("your loading is: ", loading, " e o seu checkingauth is", checkingAuth);
        return <LoadingFallback />;
      }

      // Verificação mais robusta de autenticação
      if (!isAuthenticated || !user) {
        console.log("Redirecionando para login: usuário não autenticado");
        return <Navigate to="/painel-edcap-admin-s3cr3t0l0g1n" state={{ from: location }} replace />;
      }

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.log("Redirecionando para dashboard: função não autorizada");
        return <Navigate to="/painel/dashboard" state={{ from: location, error: "Acesso não autorizado para esta seção." }} replace />; 
      }

      return children;
    };
    
    function AppContent() {
      const location = useLocation();
      const isAdminRoute = location.pathname.startsWith('/painel') && 
                           !location.pathname.startsWith('/painel-edcap-admin-s3cr3t0l0g1n') &&
                           !location.pathname.startsWith('/painel-edcap-admin-r3g1str0');
      
      const isAuthRoute = location.pathname.startsWith('/painel-edcap-admin-s3cr3t0l0g1n') || 
                          location.pathname.startsWith('/painel-edcap-admin-r3g1str0');

      const adminBase = "/painel-edcap-admin-s3cr3t0l0g1n";
      const registerBase = "/painel-edcap-admin-r3g1str0";

      return (
        <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
          <Helmet defaultTitle="EDCAP Consultoria - Gestão e Consultoria Empresarial em Angola" titleTemplate="%s | EDCAP Consultoria">
            <meta name="description" content="EDCAP Consultoria oferece soluções especializadas em gestão empresarial, consultoria estratégica e desenvolvimento de negócios em Luanda, Viana, Angola." />
            <meta name="keywords" content="consultoria angola, gestão empresarial luanda, negócios viana, estratégia empresarial angola, EDCAP" />
            <meta name="author" content="EDCAP Consultoria" />
            <meta property="og:title" content="EDCAP Consultoria - Gestão e Consultoria Empresarial em Angola" />
            <meta property="og:description" content="Soluções especializadas para o crescimento do seu negócio em Angola. Foco em Luanda e Viana." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.edcapconsultoria.co.ao" />
            <meta property="og:image" content="https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png" /> 
            <link rel="canonical" href={`https://www.edcapconsultoria.co.ao${location.pathname}`} />
          </Helmet>

          {!isAdminRoute && !isAuthRoute && <Header />}
          {isAdminRoute && <AdminHeader />}
          
          <main className={`flex-grow ${!isAdminRoute && !isAuthRoute ? 'pt-20' : ''} ${isAdminRoute ? 'pt-16' : ''}`}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
                <Route path="/sobre" element={<PageTransitionWrapper><SobrePage /></PageTransitionWrapper>} />
                <Route path="/servicos" element={<PageTransitionWrapper><ServicosPage /></PageTransitionWrapper>} />
                <Route path="/cases" element={<PageTransitionWrapper><CasesPage /></PageTransitionWrapper>} />
                <Route path="/blog" element={<PageTransitionWrapper><BlogPage /></PageTransitionWrapper>} />
                <Route path="/blog/:slug" element={<PageTransitionWrapper><BlogPostPage /></PageTransitionWrapper>} />
                <Route path="/contato" element={<PageTransitionWrapper><ContatoPage /></PageTransitionWrapper>} />
                <Route path="/politica-de-privacidade" element={<PageTransitionWrapper><PrivacyPolicyPage /></PageTransitionWrapper>} />
                <Route path="/carreiras" element={<PageTransitionWrapper><CarreirasPage /></PageTransitionWrapper>} />
                <Route path="/faq" element={<PageTransitionWrapper><FaqsPage /></PageTransitionWrapper>} />
                <Route path="/termos-de-uso" element={<PageTransitionWrapper><TermosDeUsoPage /></PageTransitionWrapper>} />
                
                <Route path={adminBase} element={<AdminLoginPage />} />
                <Route path={registerBase} element={<AdminRegisterPage />} />

                <Route path="/painel" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="posts" element={<AdminPostsPage />} />
                  <Route path="posts/novo" element={
                    <ProtectedRoute allowedRoles={['creator', 'manager']}>
                      <AdminPostEditorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="posts/editar/:postId" element={
                     <ProtectedRoute allowedRoles={['creator', 'manager']}>
                      <AdminPostEditorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="configuracoes-conta" element={
                    <ProtectedRoute allowedRoles={['creator', 'manager']}>
                      <AdminAccountSettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="usuarios" element={
                    <ProtectedRoute allowedRoles={['manager']}>
                      <AdminUsersPage />
                    </ProtectedRoute>
                  } />
                </Route>

                <Route path="*" element={<PageTransitionWrapper><NotFoundPage /></PageTransitionWrapper>} />
              </Routes>
            </Suspense>
          </main>
          {!isAdminRoute && !isAuthRoute && <Footer />}
          {isAdminRoute && <AdminFooter />}
          <Toaster />
          <CookieConsentBanner />
        </div>
      );
    }

    function App() {
      return (
        <HelmetProvider>
          <Router>
            <AuthProvider>
              <BlogProvider>
                <AppContent />
              </BlogProvider>
            </AuthProvider>
          </Router>
        </HelmetProvider>
      );
    }

    export default App;
