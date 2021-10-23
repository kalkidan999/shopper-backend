const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router ()
const cart_controller = require('../controller/cart_controller')

// add a product to a cart
router.post('/', auth.verifyToken, cart_controller.add_to_cart)

// get all the products in a cart for a signed in user
router.get('/', auth.verifyToken, cart_controller.cartAll)

// delete a cart from the elements
router.delete('/:id', auth.verifyToken, cart_controller.cartDelete)

// find the number of added elements in the cart
router.get('/size', auth.verifyToken, cart_controller.cartSize)


module.exports = router