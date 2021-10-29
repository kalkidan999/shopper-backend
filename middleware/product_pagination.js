const Product = require('../models/product_model')

const product_pagination = async (req, res, next) => {
    let page, limit;
    const match = {}
    const sorts = {}
    //console.log('hiiii: ', req.query.productType, req.query.productBrand, req.query.search)
    if (req.query.productType && req.query.productType !== "") {
        console.log('product type')
        match.productType = req.query.productType
    }
    console.log(req.query.productBrand)
    if (req.query.productBrand && req.query.productBrand !== "") {
        match.productBrand = req.query.productBrand
        console.log(`product Brand: ${match.productBrand}`)
    }
    if (req.query.search && req.query.search !== "") {
        console.log('searching----', req.query.search)
        match.search = { $search: new RegExp(req.query.search, 'i') }
    }
    if (req.query.sortBy || req.query.orderBy) {
        console.log("sorts aman sdf ", req.query.sortBy)
        sorts['sortBy'] = req.query.sortBy
        sorts['orderBy'] = req.query.OrderBy === 'desc' || req.query.orderBy === "-1" ? -1 : 1
        console.log("OrderBy: ", sorts.orderBy)
    } else {
        sorts['sortBy'] = req.query.sort
        sorts['orderBy'] = 1 
    }



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
        page = parseInt(req.query.pageIndex)
    }
    if (limit && page) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments().exec();

        const result = {};

        result.totalCounts = total
        result.pageNumber = page
        result.pageSize = Math.ceil(total / limit)
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

        try {
            console.log(result)
            console.log(`match: ${match.productBrand}`)
            console.log(`sort: ${sorts}`)
            result.data = await Product.find({
                productType: (match.productType) ? match.productType : new RegExp(/.*/),
                productBrand: match.productBrand ? match.productBrand : new RegExp(/.*/),
                //$text: match.search ? match.search : { $search: new RegExp(/.*/) }
            }).skip(startIndex).limit(limit).sort([[`${sorts.sortBy}`, sorts.orderBy]])
            res.paginatedResult = result
            next();

            // await req.results.populate({
            //     path: 'productschemas',
            //     match,
            //     options: {
            //         limit: parseInt(req.query.limit),
            //         skip: parseInt(req.query.skip),
            //         sort
            //     }
            // }).execPopulate()
            // res.send(req.user.products)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })

        }
    }
}

module.exports = { product_pagination }