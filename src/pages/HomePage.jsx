
    import React from 'react';
    import HeroSection from '@/components/home/HeroSection.jsx';
    import BenefitsSection from '@/components/home/BenefitsSection.jsx';
    import AboutEdcapSection from '@/components/home/AboutEdcapSection.jsx';
    import ServicesOverviewSection from '@/components/home/ServicesOverviewSection.jsx';
    import TestimonialsSection from '@/components/home/TestimonialsSection.jsx';
    import VideoTestimonialsSection from '@/components/home/VideoTestimonialsSection.jsx';
    import RecentBlogPostsSection from '@/components/home/RecentBlogPostsSection.jsx';
    import CallToActionSection from '@/components/home/CallToActionSection.jsx';
    import ContactFormSection from '@/components/home/ContactFormSection.jsx';
    import { Helmet } from 'react-helmet-async';

    const HomePage = () => {
      return (
        <>
        <Helmet>
            <title>EDCAP Consultoria e Gestão</title>
            <meta name="description" content="Líder em consultoria e gestão empresarial em Luanda, Viana, Angola. Oferecemos soluções estratégicas para impulsionar o seu negócio. Fale conosco!" />
             <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "EDCAP Consultoria",
                  "url": "https://www.edcapconsultoria.co.ao",
                  "logo": "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+244-924-114-831",
                    "contactType": "Customer Service",
                    "areaServed": "AO",
                    "availableLanguage": ["Portuguese"]
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Detalhes sob consulta",
                    "addressLocality": "Kilamba (Ed. R29 ap. 63)",
                    "addressRegion": "Luanda",
                    "addressCountry": "AO"
                  },
                  "sameAs": [
                    "https://facebook.com/edcapconsultoria",
                    "https://linkedin.com/company/edcapconsultoria",
                    "https://twitter.com/edcapconsultoria",
                    "https://instagram.com/edcapconsultoria"
                  ]
                }
              `}
            </script>
        </Helmet>
        <div className="space-y-16 md:space-y-24 overflow-x-hidden">
          <HeroSection />
          <BenefitsSection />
          <AboutEdcapSection />
          <ServicesOverviewSection />
          <TestimonialsSection />
          <VideoTestimonialsSection />
          <RecentBlogPostsSection />
          <CallToActionSection />
          <ContactFormSection />
        </div>
        </>
      );
    };

    export default HomePage;
  