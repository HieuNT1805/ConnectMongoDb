const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    product: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('productList', dataSchema)