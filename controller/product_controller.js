const Product = require('../models/product_model')
const ProductsBrand = require('../models/productBrand_model')
const ProductsType = require('../models/productType_model')
const appError = require('../utility/appError')
const path = require('path')
const fs = require('fs')


// add products
const productCreate = async (req, res, next) => {
    const { name, description, price, pictureUrl, productType, productBrand } = req.body
    const URL = 'http://localhost:5002'

    // checking the request parameters
    console.log("values: ", name, description, price, pictureUrl, productType, productBrand, req.file)
    if (!name || name === "") {
        fs.unlink('./uploads/images/' + req.file.filename, (err) => {
            if (err) console.log("name", err)
            console.log("file deleted successfully")
        })
        return next(new appError(400, "Invalid Item input"))
    }
    if (!description || description === "") {
        fs.unlink('./uploads/images/' + req.file.filename, (err) => {
            if (err) console.log(err)
            console.log("file deleted successfully")
        })
        return next(new appError(400, "Invalid Description  input"))
    }

    if (!price || price === "") {
        fs.unlink('./uploads/images/' + req.file.filename, (err) => {
            if (err) console.log(err)
            console.log("file deleted successfully")
        })
        return next(new appError(400, "Invalid price input"))
    }

    if (!productType || productType === "") {
        fs.unlink('./uploads/images/' + req.file.filename, (err) => {
            if (err) console.log(err)
            console.log("file deleted successfully")
        })
        return next(new appError(400, "Invalid productType input"))
    }
    if (!productBrand || productBrand === "") {
        fs.unlink('./uploads/images/' + req.file.filename, (err) => {
            if (err) console.log(err)
            console.log("file deleted successfully")
        })
        return next(new appError(400, "Invalid productBrand  input"))
    }
    const image = URL + '/api/products/image/' + req.file.filename


    // check if the product type is already present or not
    // add it to the collection of types if not found
    const isTypeNew = await ProductsType.findOne({ name: productType })
    if (isTypeNew) {
        const typeId = isTypeNew.id
        console.log("The type is already in the list: ", isTypeNew.name)
    }
    else {
        const addProductType = await ProductsType.create({
            name: productType
        }).catch((err) => {
            console.log(err)
        })
        console.log("new Product Type is added", addProductType)
    }

    // check if the product brand is already present or not
    // add it to the collection of brand if not found
    const isBrandNew = await ProductsBrand.findOne({ name: productBrand })
    if (isBrandNew) {
        const brandId = isBrandNew.id
        console.log("The Brand is already present: ", isBrandNew.name)
    }
    else {
        const addProductBrand = await ProductsBrand.create({
            name: productBrand
        }).catch((err) => {
            console.log(err)
        })
        console.log("new Product Brand is added", addProductBrand)
    }

    // adding the product to the collection
    try {
        const addProduct = await Product.create({
            name: name,
            description,
            price,
            pictureUrl: image,
            productType,
            productBrand
        }).catch((err) => {
            console.log(err)
        })
        return res.status(200).json({ status: "successfully added to database", result: addProduct })
    } catch (err) {
        console.log(err)
        return next(new appError(400, "error when saving to database"))
    }
}

// get all the products
const productAll = async (req, res) => {
    return res.status(200).json(res.paginatedResult)
}

// get a specific product
const productID = async (req, res) => {
    if (!req.params.id || req.params.id === "") {
        next(new appError(400, "undefined request"))
    }

    const product = await Product.findOne({ id: req.params.id },
        ['id', 'name', 'description', 'price', 'pictureUrl', 'productType', 'productBrand', '-_id'])

    if (product) {
        return res.status(200).json(product)                    // return the json format of the product
    }
    // error handling if the product was not found
    next(new appError(400, "the product was not found"))
}

// get a product by their product type
const productByType = async (req, res) => {

    const types = await ProductsType.find({}, ['id', 'name', '-_id'])
    //     const product = await Product.find()
    //     return res.status(200).json([{ id: 2, type: "T-shirt" }, { id: 1, type: "Shoe" }])
    //     return res.status(200).json(product)
    // }
    // // const product = await Product.find({ productType: req.body.productType }) // search for the product by Type
    // const product = await Product.find({}, 'productType _id').select()
    //     .distinct('productType', (err) => console.log(err)) // returns all types of products
    // console.log(product)
    if (types) {
        return res.status(200).json(types)    // return the json format of list of products
    }
    next(new appError(400, "There is no Type of product"))

}

// get products by their product brand
const productByBrand = async (req, res) => {
    const brands = await ProductsBrand.find({}, ['id', 'name', '-_id'])
    if (brands) {
        return res.status(200).json(brands)    // return the json format of list of products
    }
    next(new appError(400, "There is no this brand available / server error"))
}


// delete a product
const productDelete = async (req, res) => {
    if (!req.params.id || req.params.id === "") {
        next(new appError(400, "undefined request"))
    }
    const product = await Product.deleteOne(req.params.id, (err) => {
        console.log(err)
    })
    console.log(product)
}

// get picture of the product
const productImage = (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'uploads/images/' + filename);
    return res.sendFile(fullfilepath);
}

module.exports = {
    productCreate,
    productAll,
    productID,
    productByType,
    productByBrand,
    productDelete,
    productImage
};