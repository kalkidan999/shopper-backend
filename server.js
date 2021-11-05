const express = require('express');
const mongoose = require('mongoose');
const user_route = require('./route/user_route')
const product_router = require('./route/product_route')
const cart_router = require('./route/carts_route')
const order_router = require('./route/orders_route')
const appError = require('./utility/appError')
const error_handler = require('./controller/error_handler')
const path = require('path')
const cors = require('cors')


const app = express();


//console.log(PATH_MAIN)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


var corsOptions = {
    origin: '*',
    //Access-Control-Allow-Origin: *,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    if ('OPTIONS' == req.method) {
//       res.sendStatus(200);
//     }
//     else {
//       next();
//     }});

app.use(cors());

// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', false);

//     // Pass to next layer of middleware
//     next();
// });
//


app.use(express.json());
const DB_URL = process.env.DB_URL
console.log(DB_URL)
mongoose.connect(DB_URL).then(() => {
    console.log("connected to the database successfully")
}).catch((error) => {
    console.log("erro is this ==========\n\n\n", error)
    process.exit(1)
});


app.get('/', (req, res) => {
    return res.send("HI Connected successfully")
})
app.use('/api/products', product_router);
app.use('/api/carts', cart_router);
app.use('/api/users', user_route);
app.use('/api/orders', order_router);




//handle all exceptions
// app.all('*', (req, res, next) =>{
//     // const error = new Error(`unkown path ${req.originalUrl} can't find it`);
//     // error.statusCode = 404
//     // error.status = "fail"
//     const error = new appError(404, `${req.originalUrl} can't find it`)
//     next(error);
// })

// error handling
app.use(error_handler)

// export app for testing purpose
module.exports = app