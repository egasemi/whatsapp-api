const { default: mongoose } = require("mongoose")

const initDb = async () => {
    try {
        await mongoose.connect('mongodb://mongodbwsp:27017/whatsapp')
        console.log('DB connected')
    } catch (error) {
        const messageError = 'DB conection error'
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

const closeDb = async () => {
    try {
        await mongoose.connection.close()
        console.log('DB disconected')
    } catch (error) {
        const messageError = 'DB close error'
        console.error(messageError, error)
        throw new Error(messageError)
    }
}

module.exports = { initDb, closeDb }