import React from 'react';
import { useSEO } from './SEOProvider';

interface SEOAutoProps {
  pageData: {
    title: string;
    path: string;
    content: string;
    image?: string;
    type?: 'website' | 'article' | 'product' | 'profile';
  };
  siteUrl: string;
}

/**
 * Componente para automatizar SEO com base em dados da página
 */
const SEOAuto: React.FC<SEOAutoProps> = ({ pageData, siteUrl }) => {
  const { updateSEO } = useSEO();
  const { title, path, content, image, type = 'website' } = pageData;
  
  React.useEffect(() => {
    // Preparar URL canônica
    const canonical = `${siteUrl}${path}`;
    
    // Atualizar SEO com base nos dados da página
    updateSEO({
      title,
      description: content.substring(0, 160),
      canonical,
      ogTitle: title,
      ogDescription: content.substring(0, 160),
      ogImage: image ? `${siteUrl}${image}` : undefined,
      ogUrl: canonical,
      twitterTitle: title,
      twitterDescription: content.substring(0, 160),
      twitterImage: image ? `${siteUrl}${image}` : undefined,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': type.charAt(0).toUpperCase() + type.slice(1),
        name: title,
        description: content.substring(0, 160),
        url: canonical,
        ...(image && { image: `${siteUrl}${image}` })
      }
    });
    
    // Registrar página no sitemap (simulado)
    console.log(`Registrando página no sitemap: ${path}`);
    
  }, [title, path, content, image, type, siteUrl, updateSEO]);
  
  // Este componente não renderiza nada visualmente
  return null;
};

export default SEOAuto;
