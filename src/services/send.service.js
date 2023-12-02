const Message = require("../models/Message")

const saveNewMessageService = async (number, message) => {
    try {
        const nuevoMsg = new Message({ number, message })
        return await nuevoMsg.save()
    } catch (error) {
        const errorService = 'Error al guardar el nuevo mensaje'
        console.error(errorService, error)
        throw new Error(errorService)
    }
}

const updateSendedService = async (id, sended) => {
    try {
        await Message.updateOne({ _id: id }, { sended })
    } catch (error) {
        const errorService = 'Error al editar mensaje'
        console.error(errorService, error)
        throw new Error(errorService)
    }
}

const onErrorService = async (sended) => {
    try {
        const count = await Message.countDocuments({})
        if (count === 0) return false
        const messages = await Message.find({ sended })
        return (messages.length > 0)
    } catch (error) {
        const errorService = 'Hay errores en los envíos'
        console.error(errorService, error)
        throw new Error(errorService)
    }
}

module.exports = {
    saveNewMessageService,
    updateSendedService,
    onErrorService
}