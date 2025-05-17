/**
 * Utilitários para SEO no lado do cliente
 * Este arquivo contém apenas funções que podem ser executadas no navegador
 */

/**
 * Interface para registro de página no sitemap
 */
export interface SitemapPageData {
  path: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

/**
 * Hook para simular registro de página no sitemap
 * Em produção, isso enviaria uma requisição para um endpoint de API
 */
export function useRegisterInSitemap(
  pagePath: string, 
  priority: number = 0.7, 
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly'
): void {
  // Em um ambiente real, isso enviaria uma requisição para um endpoint
  console.log(`Registrando página no sitemap: ${pagePath}`);
  
  // Em produção, isso seria uma chamada de API
  // api.post('/sitemap/register', { path: pagePath, priority, changefreq });
  
  // Usando as variáveis para evitar warnings de variáveis não utilizadas
  const data = {
    path: pagePath,
    priority,
    changefreq
  };
  
  // Apenas para debug
  if (process.env.NODE_ENV === 'development') {
    console.log('Dados de sitemap:', data);
  }
}

/**
 * Gera URL amigável para SEO a partir de um título
 */
export function generateSeoUrl(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-'); // Remove hífens duplicados
}

/**
 * Verifica se uma URL é amigável para SEO
 */
export function isSeoFriendlyUrl(url: string): boolean {
  // Verifica se a URL contém apenas caracteres permitidos
  const pattern = /^[a-z0-9-]+$/;
  return pattern.test(url);
}

/**
 * Sugere melhorias para uma URL
 */
export function suggestUrlImprovements(url: string): string {
  if (isSeoFriendlyUrl(url)) {
    return url;
  }
  
  return generateSeoUrl(url);
}

export default {
  useRegisterInSitemap,
  generateSeoUrl,
  isSeoFriendlyUrl,
  suggestUrlImprovements
};
