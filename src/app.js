const express = require('express')
const orderRouter = require('./routers/order')
var cors = require('cors')

require('./db/mongoose')

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(orderRouter)

app.listen(port, () => {
    console.log('server listening on port ' + port)
})