const brands = require('./fake_brand.json')
const types = require('./fake_types.json')
const products = require('./fake_products.json')
const Product = require('../models/product_model')
const ProductsBrand = require('../models/productBrand_model')
const ProductsType = require('../models/productType_model')
const mongoose = require('mongoose')
    //console.log(PATH_MAIN)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// connecting to db
const con = async() => {
    const DB_URL = process.env.DB_URL
    await mongoose.connect(DB_URL).then(() => {
        console.log("connected to the database successfully")
    }).catch((error) => {
        console.log("erro is this ==========\n\n\n", error)
        process.exit(1)
    });
}
con();

const Populatedata = async() => {
    try {
        types.forEach(async(type) => {
            const productType = await ProductsType.create({
                //id: type.id,
                name: type.name
            }, (err) => {
                console.log(err)
            })
        })
        console.log("All Types have been added successfully")
        brands.forEach(async(brand) => {
            const productBrand = await ProductsBrand.create({
                //id: brand.id,
                name: brand.name
            }, (err) => {
                console.log(err)
            })
        })
        console.log("All Brands have been added successfully")
    } catch (err) {
        console.log(err)
    }

}

const AddProducts = () => {
    const Image_URL = "http://localhost:5002/api/products/image/"
    const URLS = "http://localhost:5002/api/products/image/"
    products.forEach(async(product) => {
        const productType = await ProductsType.findOne({ id: product.productType })
        console.log(productType.name)
        const productBrand = await ProductsBrand.findOne({ id: product.productBrand })
        console.log(productBrand.name)
            // console.log(s, p)
        console.log(product)
        await Product.create({
            //id: product.id,
            name: product.Name,
            description: product.Description,
            price: product.Price,
            pictureUrl: Image_URL + product.PictureUrl,
            productType: productType.name,
            productBrand: productBrand.name
        }, (err) => {
            console.log(err)
        })
        console.log("All Products have been added successfully")
    })
}

//Populatedata();
AddProducts();