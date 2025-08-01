# Conexão Eclesiástica

Este projeto é uma plataforma web para comunidade cristã, com mural de notícias, chat, perfis e consulta bíblica.

## Estrutura do Projeto
- `public/` — arquivos estáticos (HTML, CSS, JS, bíblia em JSON)
- `src/` — código TypeScript principal
- `public/biblia/` — arquivos da bíblia em formato JSON, organizados por versão

## Principais Funcionalidades
- Autenticação e perfis de usuário (Supabase)
- Mural de posts e chat
- Consulta e busca de versículos bíblicos
- Interface responsiva e acessível

## Dependências

- [Supabase](https://supabase.com/) — autenticação, banco de dados e storage
- [Vercel](https://vercel.com/) — deploy serverless e hospedagem estática

## Deploy com Vercel
1. Instale o CLI do Vercel (já instalado como dependência):
   ```bash
   npx vercel login
   ```
2. Configure o projeto para deploy:
   ```bash
   npx vercel --prod
   ```
3. O diretório de publicação é `public/`.

## Configuração Supabase
O projeto já está pronto para autenticação, banco de dados e storage via Supabase. Configure as variáveis de ambiente no painel da Vercel se necessário.

## Observações
- A bíblia foi atualizada a partir do repositório [thiagobodruk/biblia](https://github.com/thiagobodruk/biblia).
- O projeto não utiliza mais Firebase nem Cordova.

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o build (se necessário):
   ```bash
   # O projeto não utiliza mais Webpack, apenas TypeScript puro
   # Para compilar: tsc
   ```
3. Sirva a pasta `public/` em um servidor web ou serviço de hospedagem estática.

## Observações
- A bíblia foi atualizada a partir do repositório [thiagobodruk/biblia](https://github.com/thiagobodruk/biblia).
- O projeto não utiliza mais Firebase nem Cordova.