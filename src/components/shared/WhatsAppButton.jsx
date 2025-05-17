
    import React from 'react';
    import { motion } from 'framer-motion';
    import { MessageCircle } from 'lucide-react'; // Using MessageCircle as a generic WhatsApp icon

    const WhatsAppButton = ({ phoneNumber, message }) => {
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

      return (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-40 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contatar via WhatsApp"
        >
          <MessageCircle size={28} />
        </motion.a>
      );
    };

    export default WhatsAppButton;
  