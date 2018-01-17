const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
// const utils = require('utility')

const userRouter = require('./user')

// new APP
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user', userRouter)

io.on('connection', function(socket) {
    console.log('user login')
    socket.on('sendmsg', function(data) {
        console.log(data)
    })
})

server.listen(9097, function() {
    console.log('Node App start at port 9097')
})