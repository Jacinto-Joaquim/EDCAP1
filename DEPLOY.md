# Guia de Deploy - EduConnect Angola

Este guia explica como fazer o deploy do frontend da plataforma EduConnect Angola na Vercel.

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Git instalado em sua máquina
- Node.js versão 16 ou superior

## Estrutura do Projeto

O projeto foi desenvolvido utilizando:

- **Vite**: Como ferramenta de build
- **React**: Para a interface do usuário
- **TypeScript**: Para tipagem estática
- **Material UI**: Para componentes de interface
- **React Router**: Para navegação

## Instruções de Deploy

### Opção 1: Deploy Direto pela Vercel (Recomendado)

1. Faça login na sua conta da Vercel
2. Clique em "Add New..." e selecione "Project"
3. Importe o repositório do projeto (se estiver no GitHub, GitLab ou Bitbucket)
4. Ou faça upload do diretório do projeto
5. Configure as seguintes opções:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em "Deploy"

A Vercel detectará automaticamente que é um projeto Vite e aplicará as configurações corretas.

### Opção 2: Deploy via CLI da Vercel

1. Instale a CLI da Vercel globalmente:
   ```bash
   npm install -g vercel
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd caminho/para/educonnect/frontend
   ```

3. Faça login na Vercel (se ainda não estiver logado):
   ```bash
   vercel login
   ```

4. Execute o comando de deploy:
   ```bash
   vercel
   ```

5. Siga as instruções na tela para configurar o projeto

### Opção 3: Deploy Manual

1. Construa o projeto localmente:
   ```bash
   npm install
   npm run build
   ```

2. O diretório `dist` será gerado com os arquivos estáticos
3. Faça upload desses arquivos para qualquer serviço de hospedagem que suporte sites estáticos

## Configurações Adicionais

### Variáveis de Ambiente

Se precisar configurar variáveis de ambiente:

1. Crie um arquivo `.env` na raiz do projeto para desenvolvimento local
2. Na Vercel, adicione as mesmas variáveis em Settings > Environment Variables

### Domínio Personalizado

Para configurar um domínio personalizado:

1. No dashboard da Vercel, vá para o seu projeto
2. Navegue até "Settings" > "Domains"
3. Adicione seu domínio personalizado e siga as instruções

## Solução de Problemas

Se encontrar problemas durante o deploy:

1. Verifique se todas as dependências estão instaladas
2. Confirme que o build local funciona corretamente
3. Verifique os logs de build na Vercel para identificar erros específicos

## Suporte

Para suporte adicional, entre em contato com a equipe EduConnect Angola.
