
    import React from 'react';
    import { motion } from 'framer-motion';
    import HeroSection from '@/components/home/HeroSection.jsx';
    import BenefitsSection from '@/components/home/BenefitsSection.jsx';
    import AboutEdcapSection from '@/components/home/AboutEdcapSection.jsx';
    import ServicesOverviewSection from '@/components/home/ServicesOverviewSection.jsx';
    import TestimonialsSection from '@/components/home/TestimonialsSection.jsx';
    import RecentBlogPostsSection from '@/components/home/RecentBlogPostsSection.jsx';
    import CallToActionSection from '@/components/home/CallToActionSection.jsx';
    import ContactFormSection from '@/components/home/ContactFormSection.jsx';

    const HomePage = () => {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HeroSection />
          <BenefitsSection />
          <AboutEdcapSection />
          <ServicesOverviewSection />
          <TestimonialsSection />
          <RecentBlogPostsSection />
          <CallToActionSection />
          <ContactFormSection />
        </motion.div>
      );
    };

    export default HomePage;
  