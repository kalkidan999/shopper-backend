const express = require('express');
const mongoose = require('mongoose');
const user_route = require('./route/user_route')
const product_router = require('./route/product_route')
const cart_router = require('./route/carts_route')


const app = express();
const PORT = 5000 || process.env.PORT


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shopper").then( () => {
    console.log("connected to the database successfully")
}).catch((error) => {
    console.log("erro is this ==========", error)
    process.exit(1)
});

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})

app.use('/api/users', user_route);
app.use('/api/products', product_router);
app.use('/api/carts', cart_router);
