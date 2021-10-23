const Cart = require('../models/cart_model')
const User = require('../models/user_model')
const Product = require('../models/product_model')


const add_to_cart = async (req, res) => {
    const { productID } = req.body
    const product = await Product.find({ _id: productID })
    const userID = req.user.id
    if (product && userID) {
        if (await Cart.find({ userID }).count() >= 5) {
            return res.status(200).json({ status: "Your cart is fool" })
        }
        try {
            const result = await Cart.create({
                productID,
                userID
            })

            console.log({
                status: "successfully added to cart",
                result: result
            })
            return res.status(400).json({
                status: "successfully added to cart",
                result: result
            })
        } catch (err) {
            console.log(err)
        }
    }
}

const cartAll = async (req, res) => {
    // if (!req.params.id || req.params.id === "") {
    //     return res.status(400).json({ error: "invalid id" })
    // }
    const carts = await Cart.find({ userID: req.user.id })
    const carts_num = await Cart.find({ userID: req.user.id }).count()
    return res.status(200).json({
        number: carts_num,
        result: carts
    })
}

const cartSize = async (req, res) => {
    const carts_num = await Cart.find({ userID: req.user.id }).count()
    return res.status(200).json({number: carts_num})
}

const cartDelete = async (req, res) => {
    const id = req.params.id
    if (id !== (await Cart.find({ _id: id }))) {
        return res.status(400).json({ error: "the cart was not found" })
    }
    await Cart.deleteOne({ _id: id }).then((data) => {
        console.log("successfully deleted", id)
        res.status(200).json({ status: "successfully deleted", data })
    }).catch((error) => { console.log(error) })
}

module.exports = {
    add_to_cart,
    cartAll,
    cartDelete,
    cartSize
}