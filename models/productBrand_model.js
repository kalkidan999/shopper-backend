const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductBrand = new mongoose.Schema({
    id: {type: Number, unique: true},
    name: {type: String, required: true, unique: true}
}, { collection: 'product_brands' })

ProductBrand.plugin(AutoIncrement, {id: 'productBrand', inc_field: 'id'});

const productBrand_model = mongoose.model('productBrand', ProductBrand)

module.exports = productBrand_model