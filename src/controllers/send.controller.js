const { sendMsgWSP, haveWSP } = require("../config/wsp/initWSP")
const { saveNewMessageService, updateSendedService, onErrorService } = require("../services/send.service")

const sendController = async (req, res) => {
    const { number, message } = req.body
    try {
        const isRegistered = await haveWSP(number)
        if (isRegistered) {
            const messageDB = await saveNewMessageService(number, message)
            const response = await sendMsgWSP(number, message)

            if (response) {
                await updateSendedService(messageDB._id, true)
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

const verifyStatusController = async (req, res) => {
    try {
        const errorSend = await onErrorService(false)
        if (errorSend) {
            res.status(500).send({ message: 'Error' })
        } else {
            res.send({ message: 'OK' })
        }
    } catch (error) {
        const errorController = `Error al enviar mensaje a ${number}`
        console.error(errorController, error)
        res.status(500).send({ message: errorController })
    }
}

module.exports = { sendController, verifyStatusController }