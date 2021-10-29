const appError = require('../utility/appError')


const productValidation = (req, res, next) => {
    const { name, description, price, productType, productBrand } = req.body
    //const name = req.body.name
    //const description = req.body.description
    if (!name || name === "") {
        console.log(name, "checking name")
        next(new appError(400, "Invalid item name input"))
    }
    else if (!description || description == "") {
        console.log("checking description")
        next(new appError(400, "Invalid Description  input"))
    }
    else if (!price || price == "") {
        console.log("checking price")

        next(new appError(400, "Invalid price input"))
    }
    // if (!pictureUrl || pictureUrl === "") {
    //     return res.status(400).json({ error: "Invalid pictureUrl input" })
    // }
    else if (!productType || productType == "") {
        console.log("checking productType")

        next(new appError(400, "Invalid productType input"))
    }
    else if (!productBrand || productBrand == "") {
        console.log("checking productBrand")

        next(new appError(400, "Invalid productBrand  input"))
    }
    else {
        console.log("All neccessary data's are present")
        next()
    }
}

module.exports = productValidation
