const app = require('./server')
    // const https = require('https')
    // const http = require('http')
    // const fs = require('fs')
    // const path = require('path')

// const certificate = {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'privateKey.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'certificate.pem'))
// }
const PORT = 5002 || process.env.PORT
    // //console.log("key: ", key)
    // // SSL server connecting 
    // const httpServer = http.createServer(app);
    // const httpsServer = https.createServer(certificate, app)


// httpServer.listen(PORT, () => {
//     console.log(`listening at port ${PORT}`)
// })

// httpServer.listen(PORT, () => {
//     console.log(`listening at port ${PORT}`)
// })



app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})