const express = require('express')
require('../db/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('../routers/users.js')
const coronaRouter = require('../routers/corona')

const app = express()
const port = process.env.PORT ||5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use(coronaRouter)

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})


