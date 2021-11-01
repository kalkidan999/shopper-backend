const express = require('express')
const router = express.Router()
const product_controller = require('../controller/product_controller')
const product_pagination = require('../middleware/product_pagination')
const upload_image = require('../middleware/upload_image')
const product_validation = require('../middleware/product_validation')
const fs = require('fs')

// Add a product
router.post('/',upload_image.imageUpload.single('image'), product_controller.productCreate)

// get all products
router.get('/', product_pagination.product_pagination, product_controller.productAll)

// get products by product brand
router.get('/brands', product_controller.productByBrand)

// get products by product type
router.get('/types', product_controller.productByType)

// Image Get Routes
router.get('/image/:filename', product_controller.productImage);

// get products by id
router.get('/:id', product_controller.productID)

// delete products by id
router.delete('/:id', product_controller.productDelete)

// // post product image
// const upload = upload_image.imageUpload.single('image')
// router.post('/image', upload_image.imageUpload.single('image') , (req, res) => {
//     if (req.hasOwnProperty('file_error')) {
//         errarray.push(req.file_error);
//     }
//     // upload(req, res, (err) => {
//     //     if (err) return res.send({ error: 'invalid_file' })
//         var img = fs.readFileSync(req.file.path);
//         // var encode_image = img.toString('base64');
//         var finalImg = {
//             contentType: req.file.mimetype,
//             image: req.file.destination + '/' + req.file.filename
//         };
//         console.log(finalImg)
//         res.json(req.file)
//     // })
// })

module.exports = router