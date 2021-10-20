const Product = require('../models/product_model')

const product_pagination = async (req, res, next) => {
    let page, limit;
    if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page)
        limit = parseInt(req.query.limit)
    }
    if (req.body.limit && req.body.page) {
        page = parseInt(req.body.page)
        limit = parseInt(req.body.limit)
    }
    if (limit && page) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments().exec();

        const result = {};

        result.total_products = total
        result.curret_page = page

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < total) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }
        console.log("b", result)

        try {
            console.log(result)
            result.results = await Product.find().skip(startIndex).limit(limit)
            res.paginatedResult = result
            next();
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })

        }
    }
}

module.exports = { product_pagination }