const { sendMsgWSP, haveWSP } = require("../config/wsp/initWSP")
const { saveNewMessageService, updateSendedService, onErrorService } = require("../services/send.service")

const bulkController = async (req, res) => {
    try {
        const { numbers, message, image, seconds } = req.body
        const sleep = (sec) => {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }
        const report = []
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];

            const isRegistered = await haveWSP(number)

            if (isRegistered) {
                const messageDB = await saveNewMessageService(number, message)
                const response = await sendMsgWSP(number, message)

                if (response) {
                    await updateSendedService(messageDB._id, true)
                    console.log(`Enviado correctamente al número ${number}`)
                    report.push({ number, status: 'OK' })
                } else {
                    console.log(`Falló el envío al número ${number}`)
                    report.push({ number, status: 'Error' })
                }

                if (i !== numbers.length - 1) {
                    await sleep(seconds)
                }
            } else {
                report.push({ number, status: "No tiene whatsapp" })
            }
        }

        res.send({ report })
    } catch (error) {
        const errorController = `Error al enviar los mensajes`
        console.error(errorController, error)
        res.status(500).send({ message: errorController })
    }
}

module.exports = { bulkController }