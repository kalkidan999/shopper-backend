const Product = require('../models/product_model')

// add products
const productCreate = async (req, res) => {
    console.log("hi")
    const { name, description, price, pictureUrl, productType, productBrand } = req.body
    //console.log(item, description, sum_of_rating, num_of_ratings, categories,
       // price, discount, pictureUrl, quantity, review)
    console.log("no")
    // validation input and responding accordingly
    if (!name || name === "") {
        return res.status(400).json({ error: "Invalid Item input" })
    }
    if (!description || description === "") {
        return res.status(400).json({ error: "Invalid Description  input" })
    }
    if (!price || price === "") {
        return res.status(400).json({ error: "Invalid price input" })
    }
    if (!pictureUrl || pictureUrl === "") {
        return res.status(400).json({ error: "Invalid pictureUrl input" })
    }
    if (!productType || productType === "") {
        return res.status(400).json({ error: "Invalid productType input" })
    }
    if (!productBrand || productBrand === "") {
        return res.status(400).json({ error: "Invalid productBrand  input" })
    }

    try {
        const addProduct = await Product.create({
            name: name,
            description,
            price,
            pictureUrl,
            productType,
            productBrand
        })
        return res.status(200).json({status: "successfully added to database"})
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: "error when saving to database"})
    }


}

// get all the products
const productAll = async (req, res) => {
    const product = {"total_products": await Product.find().count(),
                    "products": await Product.find()}
    console.log(product)
    return res.status(200).json(product)
}

// get a specific product
const productID = async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log(product)
    return res.status(200).json(product)
}

// get a product by their product type
const productByType = async (req, res) => {
    console.log(req.body.productType)
    const product = await Product.find({productType: req.body.productType})
    return res.status(200).json(product)
}

// get products by their product brand
const productByBrand = async (req, res) => {
    const product = await Product.find({productBrand: req.body.productBrand})
    return res.status(200).json(product)
}


module.exports = {
    productCreate,
    productAll,
    productID,
    productByType,
    productByBrand
};