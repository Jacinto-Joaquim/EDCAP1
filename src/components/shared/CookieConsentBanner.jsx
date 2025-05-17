
    import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button.jsx';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Cookie, CheckCircle, XCircle } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const COOKIE_CONSENT_KEY = 'edcap_cookie_consent';

    const CookieConsentBanner = () => {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
          setIsVisible(true);
        }
      }, []);

      const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setIsVisible(false);
      };
      
      const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        setIsVisible(false);
      };


      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-neutral-100 p-4 shadow-2xl z-50 border-t-2 border-accent"
            >
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <Cookie className="h-8 w-8 mr-3 text-accent flex-shrink-0" />
                  <p className="text-sm md:text-base">
                    Este site utiliza cookies para melhorar sua experiência de navegação e analisar o tráfego. Ao continuar, você concorda com nosso uso de cookies. Saiba mais em nossa <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline"><Link to="/politica-de-privacidade">Política de Privacidade</Link></Button>.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Button onClick={handleAccept} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <CheckCircle className="mr-2 h-4 w-4" /> Aceitar
                  </Button>
                   <Button onClick={handleDecline} variant="outline" className="border-neutral-500 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100">
                     <XCircle className="mr-2 h-4 w-4" /> Recusar
                   </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default CookieConsentBanner;
  