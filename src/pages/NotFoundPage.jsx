
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Home, AlertTriangle } from 'lucide-react';

    const NotFoundPage = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4 bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          >
            <AlertTriangle className="h-24 w-24 md:h-32 md:w-32 text-edcap-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 font-lato">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Página Não Encontrada</h2>
            <p className="text-md md:text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              Oops! Parece que a página que você está procurando não existe ou foi movida.
            </p>
            <Button asChild size="lg" className="bg-edcap-orange hover:bg-edcap-orange/90 text-white group">
              <Link to="/">
                <Home className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Voltar para a Página Inicial
              </Link>
            </Button>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Se você acredita que isso é um erro, por favor, <Link to="/contato" className="underline hover:text-edcap-orange">entre em contato</Link>.
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;
  