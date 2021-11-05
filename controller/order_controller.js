const Order = require('../models/order_model')
const stripe = require('stripe')("sk_test_51Js2HbIhAtFU5uhy8wIDPvOOfC0Okqu8RHGksurdSGRZt4N7Fdr2BAfDzlb9RG60eGLP745xM7iNcHiKPuUQ4hmY000NdbLjFp")
const User = require('../models/user_model')
const Product = require('../models/product_model')
const appError = require('../utility/appError')


// Add order
const order = async(req, res) => {
    let total = 0
    const storeItems = [{
            "id": 1,
            "Name": "Angular Speedster Board 2000",
            "Price": 200
        },
        {
            "id": 2,
            "Name": "Green Angular Board 3000",
            "Price": 150
        },
        {
            "id": 3,
            "Name": "Core Board Speed Rush 3",
            "Price": 180
        },
    ]
    try {
        console.log(req.body.items);

        const paymentSession = await stripe.checkout.sessions.create({
            payment_method_type: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.find(storeitemr => storeitemr.id == item.id)
                return {

                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: storeItem.price * 100
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `http://localhost:5002/api/orders`,
            cancel_url: `http://localhost:5002/api/users`,
        })
        return res.json({ url: paymentSession.url })
    } catch (error) {
        console.log(error)
    }
    return res.json({ aman: "dive" })
}

module.exports = order