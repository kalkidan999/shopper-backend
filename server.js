const express = require('express');
const mongoose = require('mongoose');
const user_route = require('./route/user_route')
const product_router = require('./route/product_route')
const cart_router = require('./route/carts_route')
const appError = require('./utility/appError')
const error_handler = require('./controller/error_handler')
const path = require('path')


const app = express();


//console.log(PATH_MAIN)


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shopper").then(() => {
    console.log("connected to the database successfully")
}).catch((error) => {
    console.log("erro is this ==========\n\n\n", error)
    process.exit(1)
});



app.use('/api/users', user_route);
app.use('/api/products', product_router);
app.use('/api/carts', cart_router);



//handle all exceptions
// app.all('*', (req, res, next) =>{
//     // const error = new Error(`unkown path ${req.originalUrl} can't find it`);
//     // error.statusCode = 404
//     // error.status = "fail"
//     const error = new appError(404, `${req.originalUrl} can't find it`)
//     next(error);
// })

//error handling
app.use(error_handler)

// export app for testing purpose
module.exports = app
