const Product = require('../models/product_model')
const appError = require('../utility/appError')
const path = require('path')



// add products
const productCreate = async (req, res) => {
    const { name, description, price, pictureUrl, productType, productBrand } = req.body

    if (!name || name === "") {
        next(new appError(400, "Invalid Item input"))
    }
    if (!description || description === "") {
        next(new appError(400, "Invalid Description  input"))
    }
    if (!price || price === "") {
        next(new appError(400, "Invalid price input"))
    }
    // if (!pictureUrl || pictureUrl === "") {
    //     return res.status(400).json({ error: "Invalid pictureUrl input" })
    // }
    if (!productType || productType === "") {
        next(new appError(400, "Invalid productType input"))
    }
    if (!productBrand || productBrand === "") {
        next(new appError(400, "Invalid productBrand  input"))
    }
    const image = '/api/products/image/' + req.file.filename
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
        next(new appError(400, "error when saving to database"))
    }
}

// get all the products
const productAll = async (req, res) => {
    return res.status(200).json(res.paginatedResult)
    // try {
    //     const product = {
    //         "total_products": await Product.find().count(),     // get count of all products and all the products
    //         "products": await Product.find()
    //     }
    //     return res.status(200).json(product)                    // return json format of all products
    // } catch (err) {
    //     console.log(err)
    //     return res.status(500).json({error: err})
    // }                                        
}

// get a specific product
const productID = async (req, res) => {
    if (!req.params.id || req.params.id === "") {
        next(new appError(400, "undefined request"))
    }
    const product = await Product.findById(req.params.id)       // search for the product by Id
    if (product) {
        return res.status(200).json(product)                    // return the json format of the product
    }
    next(new appError(400, "the product was not found"))
}

// get a product by their product type
const productByType = async (req, res) => {
    if (!req.body.productType || req.body.productType === "") {
        const product = await Product.find()
        return res.status(200).json(product)
    }
    const product = await Product.find({ productType: req.body.productType }) // search for the product by Type
    if (product) {
        return res.status(200).json(product)    // return the json format of list of products
    }
    next(new appError(400, "The Brand of the product is not found"))

}

// get products by their product brand
const productByBrand = async (req, res) => {
    if (!req.body.productBrand || req.body.productBrand === "") {
        const product = await Product.find()
        return res.status(200).json(product)
    }
    const product = await Product.find({ productBrand: req.body.productBrand }) // search for the product by brand
    if (product) {
        return res.status(200).json(product)    // return the json format of list of products
    }
    next(new appError(400, "The Type of product is not found"))
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