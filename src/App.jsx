
    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence, motion } from 'framer-motion';
    import Header from '@/components/layout/Header.jsx';
    import Footer from '@/components/layout/Footer.jsx';
    import WhatsAppButton from '@/components/shared/WhatsAppButton.jsx';
    import { Toaster } from '@/components/ui/toaster.jsx';
    import { BlogProvider } from '@/contexts/BlogContext.jsx';

    const HomePage = lazy(() => import('@/pages/HomePage.jsx'));
    const SobrePage = lazy(() => import('@/pages/SobrePage.jsx'));
    const ServicosPage = lazy(() => import('@/pages/ServicosPage.jsx'));
    const CasesPage = lazy(() => import('@/pages/CasesPage.jsx'));
    const BlogPage = lazy(() => import('@/pages/BlogPage.jsx'));
    const BlogPostPage = lazy(() => import('@/pages/BlogPostPage.jsx'));
    const ContatoPage = lazy(() => import('@/pages/ContatoPage.jsx'));
    const AdminPage = lazy(() => import('@/pages/AdminPage.jsx'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'));

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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg text-primary font-semibold">Carregando...</p>
      </div>
    );

    function App() {
      return (
        <BlogProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
                    <Route path="/sobre" element={<PageTransitionWrapper><SobrePage /></PageTransitionWrapper>} />
                    <Route path="/servicos" element={<PageTransitionWrapper><ServicosPage /></PageTransitionWrapper>} />
                    <Route path="/cases" element={<PageTransitionWrapper><CasesPage /></PageTransitionWrapper>} />
                    <Route path="/blog" element={<PageTransitionWrapper><BlogPage /></PageTransitionWrapper>} />
                    <Route path="/blog/:postId" element={<PageTransitionWrapper><BlogPostPage /></PageTransitionWrapper>} />
                    <Route path="/contato" element={<PageTransitionWrapper><ContatoPage /></PageTransitionWrapper>} />
                    <Route path="/admin" element={<PageTransitionWrapper><AdminPage /></PageTransitionWrapper>} />
                    <Route path="*" element={<PageTransitionWrapper><NotFoundPage /></PageTransitionWrapper>} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <WhatsAppButton phoneNumber="5511999999999" message="Olá! Gostaria de saber mais sobre os serviços da EDCAP." />
              <Toaster />
            </div>
          </Router>
        </BlogProvider>
      );
    }

    export default App;
  