const mongoose = require('mongoose')

const CartModel = new mongoose.Schema ({
    productID: {type: String, required: true},
    userID: {type: String, required: true},
    addTime: {type: String, required: true, default: new Date()}
})

const cart_model = mongoose.model('CartModel', CartModel)

module.exports = cart_model;