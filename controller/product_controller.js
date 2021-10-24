const Product = require('../models/product_model')

// add products
const productCreate = async (req, res) => {
    const { name, description, price, pictureUrl, productType, productBrand } = req.body

    if (!name || name === "") {
        return res.status(400).json({ error: "Invalid Item input" })
    }
    if (!description || description === "") {
        return res.status(400).json({ error: "Invalid Description  input" })
    }
    if (!price || price === "") {
        return res.status(400).json({ error: "Invalid price input" })
    }
    // if (!pictureUrl || pictureUrl === "") {
    //     return res.status(400).json({ error: "Invalid pictureUrl input" })
    // }
    if (!productType || productType === "") {
        return res.status(400).json({ error: "Invalid productType input" })
    }
    if (!productBrand || productBrand === "") {
        return res.status(400).json({ error: "Invalid productBrand  input" })
    }
    const image = req.file.destination + '/' + req.file.filename
    try {
        const addProduct = await Product.create({
            name: name,
            description,
            price,
            pictureUrl: image,
            productType,
            productBrand
        })
        return res.status(200).json({ status: "successfully added to database" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: "error when saving to database" })
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
        return res.status(400).json({ error: "undefined request" })
    }
    const product = await Product.findById(req.params.id)       // search for the product by Id
    if (product) {
        return res.status(200).json(product)                    // return the json format of the product
    }
    return res.status(400).json({ error: "the product was not found" })
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
    return res.status(400).json({ error: "The Brand of the product is not found" })
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
    return res.status(400).json({ error: "The Type of product is not found" })
}


// delete a product
const productDelete = async (req, res) => {
    if (!req.params.id || req.params.id === "") {
        return res.status(400).json({ error: "undefined request" })
    }
    const product = await Product.deleteOne(req.params.id, (err) => {
        console.log(err)
    })
    console.log(product)
}

// 


module.exports = {
    productCreate,
    productAll,
    productID,
    productByType,
    productByBrand,
    productDelete
};