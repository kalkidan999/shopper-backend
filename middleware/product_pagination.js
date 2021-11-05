const Product = require('../models/product_model')
const ProductsType = require('../models/productType_model')
const ProductsBrand = require('../models/productBrand_model')

const product_pagination = async (req, res, next) => {
    let page, limit;
    const match = {}
    const sorts = {}

    // validating for request parameters
    if (req.query.typeId && req.query.typeId !== "") {
        // console.log('product type')
        const type = await ProductsType.findOne({id: req.query.typeId})
        match.productType = type.name
    }
    if (req.query.brandId && req.query.brandId !== "") {
        const brand = await ProductsBrand.findOne({id: req.query.brandId})
        match.productBrand = brand.name
        // console.log(`product Brand: ${match.productBrand}`)
    }
    if (req.query.search && req.query.search !== "") {
        console.log('searching by name: ', req.query.search)
        match.search =  req.query.search
    }


    if (req.query.sort === 'priceAsc') {
        sorts['sortBy'] = 'price'
        sorts['orderBy'] = 1
    }
    else if (req.query.sort === 'priceDesc') {
        sorts['sortBy'] = 'price'
        sorts['orderBy'] = -1
    }
    else {
        sorts['sortBy'] = 'name'
        sorts['orderBy'] = 1
    }
    // sort with every colomon very flexeble
    // if (req.query.sortBy || req.query.orderBy) {
    //     console.log("sorts aman sdf ", req.query.sortBy)
    //     sorts['sortBy'] = req.query.sortBy
    //     sorts['orderBy'] = req.query.OrderBy === 'desc' || req.query.orderBy === "-1" ? -1 : 1
    //     console.log("OrderBy: ", sorts.orderBy)
    // } else {
    //     sorts['sortBy'] = req.query.sort ? req.query.sort : "name"
    //     sorts['orderBy'] = 1
    // }



    if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page)
        limit = parseInt(req.query.limit)
    }
    else if (req.body.limit && req.body.page) {
        page = parseInt(req.body.page)
        limit = parseInt(req.body.limit)
    }
    else {
        limit = 6
        page = req.query.page ?  parseInt(req.query.page) : 1
    }
    if (limit && page) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments().exec();

        const result = {};
        result.pageIndex = page
        result.pageSize = limit
        result.count = total
        console.log("limit: ", limit, " page: ", page)

        // To define next and previvous page
        // if (startIndex > 0) {
        //     result.previous = {
        //         page: page - 1,
        //         limit: limit
        //     }
        // }

        // if (endIndex < total) {
        //     result.next = {
        //         page: page + 1,
        //         limit: limit,
        //     };
        // }

        console.log("sortBy: ", sorts.sortBy)
        console.log("b", result)

        // filter the data
        try {
            console.log(result)
            console.log(`match: ${match.productBrand}`)
            console.log(`sort: ${sorts}`)
            result.data = await Product.find({
                productType: (match.productType) ? match.productType : new RegExp(/.*/),
                productBrand: match.productBrand ? match.productBrand : new RegExp(/.*/),
                name: match.search ? { "$regex": match.search, "$options": "i" } : new RegExp(/.*/)
            }, ['id','name', 'description', 'price', 'pictureUrl', 'productType', 'productBrand', '-_id']).skip(startIndex).limit(limit).sort([[`${sorts.sortBy}`, sorts.orderBy]])
            res.paginatedResult = result
            next();
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })

        }
    }
}

module.exports = { product_pagination }