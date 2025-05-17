
    # EDCAP Consultoria - Website e Painel Administrativo

    Bem-vindo ao projeto do website e painel administrativo da EDCAP Consultoria. Esta aplicação foi desenvolvida utilizando React, Vite, TailwindCSS, shadcn/ui, Framer Motion e Supabase.

    ## Visão Geral

    O projeto consiste em:
    1.  **Website Institucional:** Apresenta a EDCAP Consultoria, seus serviços, cases de sucesso, blog e informações de contato. Focado em SEO e experiência do usuário.
    2.  **Painel Administrativo:** Uma área segura para gerenciamento de conteúdo (posts do blog), usuários e configurações da conta. Possui diferentes níveis de acesso (Criador de Conteúdo e Gerenciador).

    ## Tecnologias Utilizadas

    *   **Frontend:**
        *   **React 18.2.0:** Biblioteca JavaScript para construção de interfaces de usuário.
        *   **Vite:** Ferramenta de build e servidor de desenvolvimento rápido.
        *   **React Router 6.16.0:** Para navegação e roteamento no lado do cliente.
        *   **TailwindCSS 3.3.3:** Framework CSS utility-first para estilização.
        *   **shadcn/ui:** Coleção de componentes de UI reutilizáveis, construídos com Radix UI.
        *   **Lucide React 0.292.0:** Biblioteca de ícones SVG.
        *   **Framer Motion 10.16.4:** Para animações e transições.
        *   **React Quill 2.0.0:** Editor de texto rico para criação de posts.
        *   **React Helmet Async:** Para gerenciamento de tags `<head>` para SEO.
    *   **Backend & Banco de Dados (via Supabase):**
        *   **Supabase:** Plataforma BaaS (Backend as a Service) que utiliza PostgreSQL.
            *   **Supabase Auth:** Para autenticação e gerenciamento de usuários.
            *   **Supabase Database:** Para armazenamento de dados (posts, perfis de usuários).
            *   **Supabase Storage:** Para armazenamento de arquivos (imagens de perfil, imagens de posts).
            *   **Supabase Edge Functions (Planejado):** Para lógica de backend mais complexa e segura.
    *   **Linting:**
        *   **ESLint:** Para análise estática de código e padronização.

    ## Configuração e Execução Local

    1.  **Pré-requisitos:**
        *   Node.js (versão 20 ou superior - ver `.nvmrc`).
        *   npm (geralmente vem com o Node.js).

    2.  **Clonar o Repositório (se aplicável):**
        ```bash
        git clone <url_do_repositorio>
        cd <nome_do_diretorio_do_projeto>
        ```

    3.  **Instalar Dependências:**
        ```bash
        npm install
        ```

    4.  **Configurar Variáveis de Ambiente (Supabase):**
        *   Crie um arquivo `.env` na raiz do projeto.
        *   Adicione as suas credenciais do Supabase (obtidas no painel do seu projeto Supabase):
            ```env
            VITE_SUPABASE_URL=SUA_SUPABASE_URL
            VITE_SUPABASE_ANON_KEY=SUA_SUPABASE_ANON_KEY
            ```
        *   **Nota:** No ambiente Hostinger Horizons, essas variáveis são injetadas automaticamente após a integração com o Supabase ser configurada na plataforma. O arquivo `src/config/supabaseClient.jsx` já está configurado para usar as credenciais fornecidas diretamente no código para este ambiente específico, mas para desenvolvimento local fora da plataforma, o `.env` é o método padrão.

    5.  **Estrutura do Banco de Dados Supabase:**
        *   As tabelas principais são `profiles` (para usuários) e `posts` (para artigos do blog).
        *   **Tabela `profiles`:**
            *   `id` (uuid, primary key, geralmente linkado com `auth.users.id`)
            *   `email` (text, not null)
            *   `role` (text, not null - 'creator' ou 'manager')
            *   `full_name` (text)
            *   `description` (text)
            *   `education` (text)
            *   `experience` (text)
            *   `profile_image_url` (text)
            *   `social_linkedin` (text)
            *   `social_twitter` (text)
            *   `social_facebook` (text)
            *   `social_instagram` (text)
            *   `created_at` (timestamp with time zone)
            *   `updated_at` (timestamp with time zone)
        *   **Tabela `posts`:**
            *   `id` (uuid, primary key)
            *   `user_id` (uuid, foreign key para `auth.users.id`)
            *   `profile_id` (uuid, foreign key para `profiles.id`)
            *   `title` (text, not null)
            *   `slug` (text, not null, unique)
            *   `category` (text)
            *   `tags` (array de text)
            *   `excerpt` (text)
            *   `content` (text - HTML do editor Quill)
            *   `image_url` (text - URL da imagem de capa)
            *   `image_alt` (text - Texto alternativo para a imagem de capa)
            *   `featured` (boolean)
            *   `approved` (boolean - Gerenciadores podem aprovar posts)
            *   `published_at` (timestamp with time zone)
            *   `created_at` (timestamp with time zone)
            *   `updated_at` (timestamp with time zone)
        *   **Row Level Security (RLS):** Políticas de RLS são aplicadas para garantir que:
            *   Usuários 'creator' só possam criar, ler, atualizar e deletar seus próprios posts.
            *   Usuários 'manager' tenham acesso total a todos os posts.
            *   Usuários autenticados possam ler e atualizar seus próprios perfis.
            *   Posts aprovados sejam publicamente visíveis.
        *   **Storage Buckets:**
            *   `profile_pictures`: Para fotos de perfil dos usuários (público).
            *   `post_images`: Para imagens de capa e imagens inseridas nos posts (público).

    6.  **Rodar o Projeto em Desenvolvimento:**
        ```bash
        npm run dev
        ```
        Isso iniciará o servidor de desenvolvimento Vite, geralmente em `http://localhost:5173`.

    7.  **Build para Produção:**
        ```bash
        npm run build
        ```
        Os arquivos otimizados para produção estarão na pasta `dist/`.

    ## Funcionalidades Principais

    *   **Autenticação:**
        *   Login e Registro seguros com Supabase Auth.
        *   URLs específicas para login (`/painel-edcap-admin-s3cr3t0l0g1n`) e registro (`/painel-edcap-admin-r3g1str0`).
        *   Chaves secretas para diferenciar o cadastro de "Criador de Conteúdo" e "Gerenciador".
    *   **Gerenciamento de Posts (Painel Admin):**
        *   Criação, edição e exclusão de posts.
        *   Editor de texto rico (React Quill) com formatação avançada, inserção de mídia (imagens/vídeos por URL), tabelas, blocos de código, e um placeholder `[AD_BLOCK]` para futura inserção de anúncios.
        *   Controle de aprovação de posts por Gerenciadores.
        *   Upload de imagem de capa com texto alternativo.
    *   **Gerenciamento de Usuários (Painel Admin - apenas Gerenciadores):**
        *   Visualização e (futuramente) gerenciamento de usuários.
    *   **Configurações de Conta (Painel Admin):**
        *   Edição de dados do perfil do autor (nome, descrição, formação, experiência, links de redes sociais).
        *   Upload de foto de perfil (armazenada no Supabase Storage).
    *   **SEO (Search Engine Optimization):**
        *   Meta tags dinâmicas (título, descrição, keywords) por página.
        *   Dados Estruturados (JSON-LD) para organização, artigos de blog e páginas de contato.
        *   Atributos `alt` em todas as imagens.
        *   URLs amigáveis (slugs para posts).
        *   Foco geográfico em Angola (Luanda, Viana) nas meta tags e conteúdo.
        *   Mapa do Google Maps configurado para a localização correta.
    *   **Cookies e Sessões:**
        *   Banner de consentimento de cookies.
        *   Página de Política de Privacidade.
        *   Gerenciamento seguro de sessões de usuário via Supabase Auth.

    ## Uso de Imagens e Outros Recursos

    *   **Imagens do Site:**
        *   O logotipo principal e outras imagens estáticas são referenciados diretamente no código.
        *   Imagens de posts e perfis são carregadas via Supabase Storage e seus URLs são armazenados no banco de dados.
        *   **Otimização:** É crucial que as imagens carregadas para posts e perfis sejam otimizadas (tamanho e formato) antes do upload para garantir bom desempenho e SEO.
        *   **Atributos `alt`:** Sempre fornecer texto alternativo descritivo para todas as imagens para acessibilidade e SEO.
    *   **Ícones:** Utiliza a biblioteca Lucide React para ícones SVG consistentes e leves.
    *   **Fontes:** As fontes são definidas no `tailwind.config.js` e `src/index.css`. O editor Quill também pode ter fontes customizadas.

    ## Estrutura do Projeto (Principais Pastas)

    ```
    ├── public/                  # Arquivos estáticos
    ├── src/
    │   ├── assets/              # Imagens, fontes locais, etc.
    │   ├── components/
    │   │   ├── admin/           # Componentes específicos do painel admin
    │   │   ├── home/            # Componentes da HomePage
    │   │   ├── layout/          # Header, Footer (público e admin)
    │   │   ├── shared/          # Componentes reutilizáveis em todo o site
    │   │   └── ui/              # Componentes shadcn/ui (Button, Card, etc.)
    │   ├── config/
    │   │   └── supabaseClient.jsx # Configuração do cliente Supabase
    │   ├── contexts/            # Contextos React (AuthContext, BlogContext)
    │   ├── hooks/               # Hooks customizados (ex: useUserProfile)
    │   ├── lib/                 # Utilitários, helpers (ex: utils.js, supabaseSessionManager.js)
    │   ├── pages/               # Componentes de página (rotas)
    │   │   ├── admin/           # Páginas do painel administrativo
    │   │   └── ...              # Páginas públicas
    │   ├── services/            # Lógica de serviço (ex: blogService.js)
    │   ├── styles/              # CSS customizado (ex: para Quill)
    │   ├── App.jsx              # Componente principal da aplicação e configuração de rotas
    │   ├── main.jsx             # Ponto de entrada da aplicação React
    │   └── index.css            # Estilos globais e TailwindCSS
    ├── .env                     # Variáveis de ambiente (NÃO versionar se contiver segredos)
    ├── .eslintrc.cjs            # Configuração do ESLint
    ├── .gitignore               # Arquivos ignorados pelo Git
    ├── package.json             # Dependências e scripts do projeto
    ├── postcss.config.js        # Configuração do PostCSS (para TailwindCSS)
    ├── tailwind.config.js       # Configuração do TailwindCSS
    └── vite.config.js           # Configuração do Vite
    ```

    ## Implantação

    O projeto pode ser implantado em plataformas como:
    *   Hostinger (com integração para projetos Node.js/Vite)
    *   Vercel
    *   Netlify
    *   Servidores próprios com Node.js

    Para a implantação, geralmente é necessário configurar as variáveis de ambiente do Supabase na plataforma de hospedagem.

    ## Contribuição

    (Se aplicável, adicione diretrizes de contribuição aqui.)

    ---

    Este README fornece uma visão geral do projeto EDCAP Consultoria. Para mais detalhes, consulte o código-fonte e a documentação específica de cada tecnologia utilizada.
  