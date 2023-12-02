const qrcode = require('qrcode-terminal')
const { LocalAuth, Client } = require('whatsapp-web.js');
const { onMsg } = require('../webhook');

let clientWSP = null

const initWSP = async () => {
    clientWSP = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        }
    });

    clientWSP.on('qr', qr => {
        qrcode.generate(qr, { small: true })
    })

    clientWSP.on('authenticated', () => {
        console.log('auth ok')
    })

    clientWSP.on('auth_failure', (msg) => {
        console.log(`auth error ${msg}`)
    })

    clientWSP.on('loading_screen', (percentage, mjs_count) => {
        console.log(`loading ${percentage} - ${mjs_count} messajes`)
    })

    clientWSP.on('ready', () => {
        console.log('client is ready!');
    });

    clientWSP.on('message', (msg) => {
        onMsg(msg.from, msg.body)
    });

    await clientWSP.initialize();

}

const sendMsgWSP = async (number, message) => {
    try {
        number = number + '@c.us'

        const response = await clientWSP.sendMessage(number, message)
        return response
    } catch (error) {
        const messageError = `Error al enviar mensaje a ${number}`
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

module.exports = { initWSP, sendMsgWSP }
