import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Interface para as propriedades de SEO
interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, any>;
  noIndex?: boolean;
}

// Contexto para gerenciar o SEO globalmente
interface SEOContextType {
  updateSEO: (props: Partial<SEOProps>) => void;
  currentSEO: SEOProps;
}

const defaultSEO: SEOProps = {
  title: 'EduConnect Angola',
  description: 'Plataforma educacional para escolas, professores e alunos em Angola',
  keywords: 'educação, angola, ensino online, plataforma educacional',
  canonical: '',
  ogTitle: 'EduConnect Angola',
  ogDescription: 'Plataforma educacional para escolas, professores e alunos em Angola',
  ogImage: '',
  ogUrl: '',
  twitterCard: 'summary_large_image',
  twitterTitle: 'EduConnect Angola',
  twitterDescription: 'Plataforma educacional para escolas, professores e alunos em Angola',
  twitterImage: '',
  structuredData: {},
  noIndex: false,
};

const SEOContext = createContext<SEOContextType>({
  updateSEO: () => {},
  currentSEO: defaultSEO,
});

export const useSEO = () => useContext(SEOContext);

interface SEOProviderProps {
  children: ReactNode;
  defaultSEO?: Partial<SEOProps>;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ 
  children, 
  defaultSEO: customDefaultSEO 
}) => {
  const [seo, setSEO] = React.useState<SEOProps>({
    ...defaultSEO,
    ...customDefaultSEO,
  });

  const updateSEO = (props: Partial<SEOProps>) => {
    setSEO(prevSEO => ({
      ...prevSEO,
      ...props,
    }));
  };

  return (
    <HelmetProvider>
      <SEOContext.Provider value={{ updateSEO, currentSEO: seo }}>
        <SEOHead {...seo} />
        {children}
      </SEOContext.Provider>
    </HelmetProvider>
  );
};

// Componente para renderizar as meta tags
const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  noIndex,
}) => {
  // Preparar o JSON-LD para dados estruturados
  const jsonLd = structuredData && Object.keys(structuredData).length > 0
    ? JSON.stringify(structuredData)
    : null;

  return (
    <Helmet>
      {/* Título e meta tags básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      {/* Indexação */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Dados estruturados JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {jsonLd}
        </script>
      )}
    </Helmet>
  );
};

export default SEOProvider;
