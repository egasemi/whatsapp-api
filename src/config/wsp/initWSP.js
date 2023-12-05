const qrcode = require('qrcode-terminal')
const { LocalAuth, Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo')
const { onMsg } = require('../webhook');

let clientWSP = null

const initWSP = async (db) => {
    const store = new MongoStore({ mongoose: db })
    clientWSP = new Client({

        authStrategy: new RemoteAuth({
            clientId: 'emi',
            store: store,
            backupSyncIntervalMs: 60000
        }),
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

    clientWSP.on('remote_session_saved', () => {
        console.log('remote sesion saved')
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
        console.log(msg)
    });

    await clientWSP.initialize();

}

const sendMsgWSP = async (number, message, options) => {
    try {
        number = number + '@c.us'

        const response = await clientWSP.sendMessage(number, message, options)
        return response
    } catch (error) {
        const messageError = `Error al enviar mensaje a ${number}`
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

const getChats = async () => {
    try {
        const response = await clientWSP.getChats()
        return response
    } catch (error) {
        const messageError = `Error al obtener los chats`
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

const haveWSP = async (number) => {
    try {
        number = number + '@c.us'
        const response = await clientWSP.isRegisteredUser(number)
        return response
    } catch (error) {
        const messageError = `Error al enviar mensaje a ${number}`
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

module.exports = { initWSP, sendMsgWSP, getChats, haveWSP }
