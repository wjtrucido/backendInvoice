const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    measurement_unit: {
        type: String
    },
    purchase_price: {
        type: Number
    },
    sale_price: {
        type: Number
    },
    tax: {
        type: Number
    }
})
module.exports = mongoose.model('Product', productSchema)
