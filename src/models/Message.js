const { Schema, default: mongoose } = require("mongoose");

const MessageSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sended: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Message', MessageSchema)