const express = require('express')
const router = express.Router()
const order_controller = require('../controller/order_controller')

router.post('/', order_controller)

module.exports = router