const express = require('express')
const { sendController, verifyStatusController } = require('../controllers/send.controller.js')
const api = express()

api.use(express.json())

api.post('/send', sendController)
api.get('/check', verifyStatusController)

module.exports = api