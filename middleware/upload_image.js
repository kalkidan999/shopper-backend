const multer = require('multer')
const path = require('path')

// define image storage and filename
const imageStorage = multer.diskStorage({
    destination: '/uploads/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

// upload the image
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10 // = 10 MB
    }
    // fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
    //         // upload only png and jpg format
    //         return cb(new Error('Please upload a Image'))
    //     }
    //     cb(null, true)
    //     console.log("\n\n\n\\")
    // }
})
// .single('image')

// const uploadImages = (req, res, next) => {
//     imageUpload(req, res, err => {
//         if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
//             if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
//                 return res.status(400).json(err)
//             }
//         } else if (err) {
//             // handle other errors
//             return res.status(400).send(err)
//         }
//         // Everything is ok.
//         return next();
//     })
// };



module.exports = { imageUpload }