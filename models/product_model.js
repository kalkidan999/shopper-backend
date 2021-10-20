const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    pictureUrl: {type: String, required: true},
    productType: {type: String, required: true},
    productBrand: {type: String, required: true},
    quantity: {type: Number, required: true}
})

const product_model = mongoose.model('ProductSchema', ProductSchema)
module.exports = product_model;
