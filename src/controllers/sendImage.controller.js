const { MessageMedia } = require("whatsapp-web.js")
const { sendMsgWSP, haveWSP } = require("../config/wsp/initWSP")
const { saveNewMessageService } = require("../services/send.service")

const sendImageController = async (req, res) => {
    const { number, message } = req.body
    try {
        const isRegistered = await haveWSP(number)
        if (isRegistered) {
            const media = await MessageMedia.fromUrl("https://ih1.redbubble.net/image.4814366614.4972/mp,504x498,matte,f8f8f8,t-pad,600x600,f8f8f8.jpg")
            const response = await sendMsgWSP(number, media, { caption: message })

            if (response) {
                res.send({ message: 'Mensaje enviado' })
            } else {
                res.send({ message: 'Mensaje no enviado' })
            }
        } else {
            res.send({ message: 'No tiene whatsapp' })
        }
    } catch (error) {
        const errorController = `Error al enviar mensaje a ${number}`
        console.error(errorController, error)
        res.status(500).send({ message: errorController })
    }
}

module.exports = { sendImageController }