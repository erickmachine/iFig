const makeWASocket = require("@whiskeysockets/baileys").default
const {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  downloadMediaMessage,
} = require("@whiskeysockets/baileys")
const pino = require("pino")
const Jimp = require("jimp")
const fs = require("fs")
const path = require("path")

const tempDir = path.join(__dirname, "temp")
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

console.log("Bot de figurinhas iniciando...\n")

async function processImageToSticker(imageBuffer) {
  try {
    const image = await Jimp.read(imageBuffer)

    image.contain(512, 512, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)

    const processedBuffer = await image.getBufferAsync(Jimp.MIME_PNG)
    return processedBuffer
  } catch (error) {
    console.error("Erro ao processar imagem:", error)
    return null
  }
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: "silent" }),
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update
    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      console.log("Conexao fechada. Reconectando:", shouldReconnect)
      if (shouldReconnect) {
        startBot()
      }
    } else if (connection === "open") {
      console.log("Bot conectado e pronto!")
      console.log("Use: !fig (responda a uma imagem)")
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""

    if (!text.toLowerCase().startsWith("!fig")) return

    console.log("Comando recebido:", text)

    try {
      let imageMessage = null
      let stickerName = ""

      const parts = text.split("+")
      if (parts.length > 1) {
        stickerName = parts[1].trim()
      }

      if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage
        if (quoted.imageMessage) {
          imageMessage = quoted.imageMessage
        }
      } else if (msg.message?.imageMessage) {
        imageMessage = msg.message.imageMessage
      }

      if (!imageMessage) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: "Responda a uma imagem com !fig ou envie uma imagem com legenda !fig",
        })
        return
      }

      await sock.sendMessage(msg.key.remoteJid, {
        text: "Criando figurinha...",
      })

      const buffer = await downloadMediaMessage(
        imageMessage,
        "buffer",
        {},
        {
          logger: pino({ level: "silent" }),
          reuploadRequest: sock.updateMediaMessage,
        },
      )

      const stickerBuffer = await processImageToSticker(buffer)

      if (!stickerBuffer) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: "Erro ao processar imagem",
        })
        return
      }

      await sock.sendMessage(msg.key.remoteJid, {
        sticker: stickerBuffer,
      })

      console.log("Figurinha enviada!")
    } catch (error) {
      console.error("Erro:", error)
      await sock.sendMessage(msg.key.remoteJid, {
        text: "Erro ao criar figurinha",
      })
    }
  })
}

startBot()
