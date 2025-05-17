// Arquivo para geração do sitemap.xml em tempo de build
// Este script deve ser executado como parte do processo de build

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do sitemap
const siteConfig = {
  siteUrl: 'https://educonnect-angola.vercel.app',
  outputPath: path.join(__dirname, '../public/sitemap.xml'),
  routes: [
    '/',
    '/login',
    '/register',
    '/dashboard',
    '/classroom',
    '/profile',
    '/about',
    '/contact',
    '/schools',
    '/teachers',
    '/students'
  ],
  // Exemplos de rotas dinâmicas que seriam geradas em produção
  dynamicRoutes: [
    { path: '/schools/example-school', priority: 0.8, changefreq: 'weekly' },
    { path: '/classroom/example-class', priority: 0.7, changefreq: 'daily' }
  ]
};

// Gera o sitemap.xml
function generateSitemap() {
  const { siteUrl, routes, dynamicRoutes = [], outputPath } = siteConfig;
  
  // Cabeçalho do XML
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Adicionar rotas estáticas
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteUrl}${route}</loc>\n`;
    sitemap += '    <lastmod>' + new Date().toISOString() + '</lastmod>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '  </url>\n';
  });
  
  // Adicionar rotas dinâmicas
  dynamicRoutes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteUrl}${route.path}</loc>\n`;
    sitemap += '    <lastmod>' + new Date().toISOString() + '</lastmod>\n';
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += '  </url>\n';
  });
  
  // Fechamento do XML
  sitemap += '</urlset>';
  
  // Garantir que o diretório existe
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Salvar o arquivo
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap gerado em: ${outputPath}`);
}

// Gera o robots.txt
function generateRobotsTxt() {
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  const { siteUrl } = siteConfig;
  
  const robotsTxt = `# EduConnect Angola robots.txt
User-agent: *
Allow: /

# Áreas restritas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;
  
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`Robots.txt gerado em: ${robotsPath}`);
}

// Executar geração
generateSitemap();
generateRobotsTxt();

console.log('Arquivos de SEO gerados com sucesso!');
