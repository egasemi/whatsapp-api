const { getChats } = require("../config/wsp/initWSP")

const chatsController = async (req, res) => {
    try {
        const chats = await getChats()
        res.send(chats)
    } catch (error) {
        const errorController = `Error al obtener los chats`
        console.error(errorController, error)
        res.status(500).send({ message: errorController })
    }
}

module.exports = { chatsController }