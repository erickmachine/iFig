# Instalacao - Versao Baileys (Mais Leve)

Esta versao usa a biblioteca Baileys que e mais leve e funciona melhor no Termux.

## Passo a Passo

### 1. Preparar Termux

\`\`\`bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
\`\`\`

### 2. Ir para a pasta do projeto

\`\`\`bash
cd ~/botfigurinhas
\`\`\`

### 3. Remover instalacao anterior (se houver erro)

\`\`\`bash
rm -rf node_modules package-lock.json
\`\`\`

### 4. Usar a versao Baileys

\`\`\`bash
cp package-baileys.json package.json
npm install
\`\`\`

### 5. Iniciar o bot

\`\`\`bash
node index-baileys.js
\`\`\`

### 6. Escanear QR Code

Um QR Code aparecera no terminal. Escaneie com seu WhatsApp.

## Uso

\`\`\`
!fig - responda a uma imagem
!fig + meu nome - adicione um nome
\`\`\`

## Solucao de Problemas

### Se der erro de modulo nao encontrado:

\`\`\`bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
\`\`\`

### Se precisar voltar para versao original:

\`\`\`bash
cp package.json.backup package.json
npm install
\`\`\`

## Diferenca entre versoes

- **Versao original (whatsapp-web.js)**: Usa Puppeteer, mais pesada
- **Versao Baileys**: Mais leve, consome menos memoria, ideal para Termux
