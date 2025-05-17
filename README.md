# README - EduConnect Angola

## Visão Geral

EduConnect Angola é uma plataforma educacional SaaS desenvolvida para conectar escolas, professores e alunos em Angola, oferecendo recursos de streaming de vídeo, interação social e gestão de conteúdo educacional.

Este repositório contém o frontend da aplicação, desenvolvido com Vite, React, TypeScript e Material UI, pronto para ser hospedado na Vercel.

## Tecnologias Utilizadas

- **Vite**: Ferramenta de build rápida para desenvolvimento moderno
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Material UI**: Framework de componentes de UI
- **React Router**: Biblioteca para navegação

## Estrutura do Projeto

```
frontend/
├── public/             # Arquivos estáticos
│   ├── sitemap.xml     # Sitemap gerado automaticamente
│   └── robots.txt      # Configurações para crawlers
├── src/
│   ├── assets/         # Imagens e recursos
│   ├── components/     # Componentes reutilizáveis
│   │   └── SEO/        # Componentes de otimização para SEO
│   ├── pages/          # Páginas da aplicação
│   ├── routes/         # Configuração de rotas
│   ├── theme/          # Tema e estilos
│   ├── utils/          # Utilitários
│   ├── main.tsx        # Ponto de entrada
│   └── index.css       # Estilos globais
├── scripts/            # Scripts de automação
├── dist/               # Build de produção (gerado)
├── vercel.json         # Configuração para deploy na Vercel
├── DEPLOY.md           # Guia de deploy
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configuração do TypeScript
```

## Funcionalidades Principais

- **Streaming de Vídeo**: Aulas ao vivo e gravadas
- **Interação Social**: Chat, fóruns e grupos de estudo
- **Gestão de Conteúdo**: Biblioteca organizada de materiais educacionais
- **Experiência Mobile**: Design responsivo para todos os dispositivos
- **Segurança**: Controle de acesso e proteção de dados
- **SEO Otimizado**: Sistema automático de SEO para usuários leigos

## Começando

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório ou extraia o arquivo zip
2. Navegue até o diretório do projeto
3. Instale as dependências:

```bash
npm install
# ou
yarn
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build

Para criar uma versão de produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos de build serão gerados no diretório `dist/`

## Deploy

Este projeto está configurado para deploy na Vercel. Consulte o arquivo [DEPLOY.md](DEPLOY.md) para instruções detalhadas.

## Otimização de SEO

A plataforma EduConnect Angola foi desenvolvida com foco em SEO, implementando as melhores práticas para garantir visibilidade nos mecanismos de busca.

### Recursos de SEO Implementados

1. **Meta Tags Dinâmicas**: Todas as páginas possuem meta tags otimizadas que são geradas dinamicamente com base no conteúdo.

2. **SEO Automático para Usuários Leigos**: Sistema que permite que usuários sem conhecimento técnico otimizem suas páginas para SEO através de formulários intuitivos.

3. **Dados Estruturados Schema.org**: Implementação automática de dados estruturados para melhor compreensão pelos mecanismos de busca.

4. **Sitemap.xml Automático**: Geração automática de sitemap.xml para facilitar a indexação pelos mecanismos de busca.

5. **Robots.txt Configurável**: Arquivo robots.txt para controlar o acesso dos crawlers às diferentes áreas do site.

6. **URLs Amigáveis**: Estrutura de URLs limpa e semântica para melhor indexação.

7. **Otimização de Performance**: Carregamento rápido de páginas, fator importante para SEO.

### Como Usar o Sistema de SEO Automático

#### Para Desenvolvedores

1. **SEOProvider**: Componente principal que deve envolver toda a aplicação (já configurado em `main.tsx`).

```jsx
<SEOProvider defaultSEO={{
  title: 'Título Padrão',
  description: 'Descrição padrão do site'
}}>
  {/* Conteúdo da aplicação */}
</SEOProvider>
```

2. **SEOAuto**: Componente para páginas estáticas que configura automaticamente o SEO com base no conteúdo.

```jsx
<SEOAuto 
  pageData={{
    title: 'Título da Página',
    path: '/caminho-da-pagina',
    content: 'Conteúdo principal da página',
    image: '/caminho-da-imagem.jpg',
    type: 'article' // ou 'product', 'service', 'profile', 'website'
  }}
  siteUrl="https://seu-site.com"
/>
```

3. **Geração de Sitemap**: Execute o script para gerar o sitemap.xml e robots.txt:

```bash
node scripts/generate-seo-files.js
```

#### Para Usuários Finais (Não Técnicos)

1. Acesse o painel administrativo da plataforma
2. Navegue até "Configurações de SEO"
3. Preencha o formulário intuitivo com:
   - Título da página
   - Descrição
   - Palavras-chave (ou use o botão "Sugerir" para geração automática)
   - Imagem para compartilhamento em redes sociais
   - Tipo de página
4. Clique em "Aplicar Configurações de SEO"

### Boas Práticas de SEO

1. **Títulos Otimizados**: Mantenha títulos entre 30-60 caracteres, incluindo palavras-chave relevantes.

2. **Descrições Atrativas**: Crie descrições entre 70-160 caracteres que incentivem o clique.

3. **Conteúdo de Qualidade**: Priorize conteúdo original, relevante e de valor para os usuários.

4. **Imagens Otimizadas**: Use imagens com nomes de arquivo descritivos e atributos alt.

5. **Links Internos**: Crie uma estrutura de links internos que facilite a navegação e indexação.

6. **Mobile-First**: Garanta que o site seja totalmente responsivo e otimizado para dispositivos móveis.

7. **Velocidade de Carregamento**: Mantenha o site rápido, otimizando imagens e recursos.

8. **Monitoramento**: Integre com Google Search Console para acompanhar o desempenho de SEO.

## Personalização

### Tema

O tema visual pode ser personalizado no arquivo `src/theme/theme.ts`

### Rotas

As rotas da aplicação podem ser configuradas em `src/routes/routes.tsx`

## Licença

© 2025 EduConnect Angola. Todos os direitos reservados.
