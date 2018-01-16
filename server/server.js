const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const utils = require('utility')

const userRouter = require('./user')

// new APP
const app = express()

app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(9097, function() {
    console.log('Node App start at port 9097')
})