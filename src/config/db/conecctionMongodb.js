const { default: mongoose } = require("mongoose")

const initDb = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp'
    try {
        await mongoose.connect(uri)
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