const mongoose = require('mongoose')

const OrderModel = mongoose.Schema({
    userID,
    paymentID,
    paymentStatus,
    orderAt,
    currency,
    items,
    shippingStatus,
    shippingAddress
}, 'orders');

const order_model = mongoose.model('OrderModel', OrderModel)

module.exports = order_model

