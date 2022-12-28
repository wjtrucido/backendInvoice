const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    tel: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Client', clientSchema)