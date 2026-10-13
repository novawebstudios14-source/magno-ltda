# MAGNO LTDA

Site: https://magno-ltda-novaweb.vercel.app

## Estrutura

- `dist/`: HTML, CSS, JavaScript, fotografias WebP, ícones SVG e fontes locais.
- `DESIGN.md`: decisões de design e fontes do conteúdo.
- `verification.json`: verificações realizadas e limites do teste.
- `vercel.json`: publicação estática na Vercel.

## Publicação

Framework Other, saída `dist`, sem instalação ou build. A branch `main` está conectada ao projeto `magno-ltda` na equipe `novaweb`.

Para servir localmente: `python3 -m http.server 8000 --directory dist`.

O formulário prepara uma mensagem no navegador. O visitante confirma o envio no WhatsApp; não há banco de dados ou login.

A política de privacidade descreve o fluxo disponível. Dados jurídicos e retenção das conversas dependem de confirmação do responsável.

Testes de DOM/script não substituem testes visuais em navegador, leitores de tela ou Core Web Vitals.
