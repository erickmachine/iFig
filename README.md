# Bot de Figurinhas WhatsApp - Versao Baileys

Versao otimizada para Termux usando a biblioteca Baileys.

## Vantagens

- Mais leve e rapido
- Menor consumo de memoria
- Melhor compatibilidade com Termux
- Nao precisa de Chromium/Puppeteer

## Instalacao Rapida

\`\`\`bash
cd ~/botfigurinhas
cp package-baileys.json package.json
npm install
node index-baileys.js
\`\`\`

## Como Usar

1. Envie ou responda a uma imagem com `!fig`
2. Para adicionar nome: `!fig + meu nome`
3. Funciona em grupos e privado

## Comandos

- `!fig` - Cria figurinha
- `!fig + texto` - Cria figurinha com nome

## Tecnologias

- Baileys - API WhatsApp leve
- Jimp - Processamento de imagem
- Pino - Logger rapido

## Dicas

- Primeira vez: escaneie o QR code
- Bot salva sessao automaticamente
- Para reiniciar: Ctrl+C e rodar novamente
