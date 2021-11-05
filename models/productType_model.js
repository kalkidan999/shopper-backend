const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductType = new mongoose.Schema({
    id: {type: Number, unique: true},
    name: {type: String, required: true, unique: true}
}, {collection: "product_types"})

ProductType.plugin(AutoIncrement, {id: 'ProductType', inc_field: 'id'});

const productType_model = mongoose.model('ProductType', ProductType)

module.exports = productType_model