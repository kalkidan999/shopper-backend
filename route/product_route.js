const express = require('express')
const router = express.Router()
const product_controller = require('../controller/product_controller')

// Add a product
router.post('/add', product_controller.productCreate)

// get all products
router.get('/', product_controller.productAll)

// get products by product brand
router.get('/brand', product_controller.productByBrand)

// get products by product type
router.get('/type', product_controller.productByType)

// get products by id
router.get('/:id', product_controller.productID)

module.exports = router