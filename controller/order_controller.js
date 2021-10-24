const Order = require('../models/order_model')
const User = require('../models/user_model')
const Product = require('../models/product_model')

// Add order
const orderAdd = async (req, res) => {
    const productQuantity = req.body.product
    const user = User.find({_id: req.user.id})
    const 
}