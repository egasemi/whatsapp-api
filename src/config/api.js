const express = require('express')
const { sendController, verifyStatusController } = require('../controllers/send.controller.js')
const { bulkController } = require('../controllers/bulk.controller.js')
const { chatsController } = require('../controllers/chats.controller.js')
const { sendImageController } = require('../controllers/sendImage.controller.js')
require('dotenv').config()
const api = express()

api.use(express.json())

api.post('/send', sendController)
api.post('/sendImage', sendImageController)
api.post('/bulk', bulkController)
api.get('/chats', chatsController)
api.get('/check', verifyStatusController)

module.exports = api