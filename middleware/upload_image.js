const multer = require('multer')
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const appError = require('../utility/appError')

// define image storage and filename
const imageStorage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

// // Init gfs
// let gfs;

// // conn.once('open', () => {
// //     // Init stream
// //     gfs = Grid(conn.db, mongoose.mongo);
// //     gfs.collection('uploads');
// // });

// const DB_URL = process.env.DB_URL
// const storage = GridFsStorage({
//     url: DB_URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// upload the image
const imageUpload = multer({
        storage: imageStorage,
        limits: {
            fileSize: 1024 * 1024 * 10 // = 10 MB
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                // upload only png and jpg format
                return cb(new appError(401, 'Please upload a Image'))
            }
            console.log("image uploaded successfully")
            cb(null, true)
        }
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