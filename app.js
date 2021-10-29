const app = require('./server')

const PORT = 5001 || process.env.PORT
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})