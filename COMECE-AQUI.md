# COMECE AQUI - Instalacao Rapida

## Opcao 1: Instalacao Automatica (RECOMENDADO)

\`\`\`bash
chmod +x instalar.sh
./instalar.sh
\`\`\`

Escolha a opcao 2 (Baileys) para melhor desempenho no Termux.

## Opcao 2: Instalacao Manual

### Para versao LEVE (Baileys - Recomendado):

\`\`\`bash
cp package-baileys.json package.json
npm install
node index-baileys.js
\`\`\`

### Para versao ORIGINAL (whatsapp-web.js):

\`\`\`bash
npm install
node index.js
\`\`\`

## Se der erro "Cannot find module"

Significa que voce nao rodou o `npm install`. Execute:

\`\`\`bash
npm install
\`\`\`

Aguarde a instalacao terminar (pode demorar 2-5 minutos).

## Comandos Uteis

\`\`\`bash
# Ver se npm esta instalado
npm -v

# Limpar e reinstalar
rm -rf node_modules
npm cache clean --force
npm install

# Iniciar bot
node index-baileys.js
\`\`\`

## Uso do Bot

Apos escanear o QR code:

\`\`\`
!fig               # Responda a uma imagem
!fig + meu nome    # Com nome personalizado
\`\`\`

## Problemas Comuns

### "Cannot find module"
- Voce nao rodou `npm install`
- Solucao: `npm install` e aguarde terminar

### "ENOENT: no such file or directory"
- Voce nao esta na pasta certa
- Solucao: `cd ~/botfigurinhas`

### Bot desconecta
- Normal, reconecta automaticamente
- Ou reinicie: Ctrl+C e rode novamente

## Diferenca entre versoes

| Recurso | Original | Baileys |
|---------|----------|---------|
| Tamanho | ~500MB | ~50MB |
| Velocidade | Medio | Rapido |
| Memoria | Alta | Baixa |
| Termux | Funciona | MELHOR |

**Recomendacao: Use a versao Baileys para Termux!**
\`\`\`
