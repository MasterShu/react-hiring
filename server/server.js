const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
// const utils = require('utility')

const model = require('./model')
const userRouter = require('./user')
const Chat = model.getModel('chat')

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
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg, create_time: new Date().getTime()}, function(e, d) {
            io.emit('recvmsg', Object.assign({}, d._doc))
        })
    })
})

server.listen(9097, function() {
    console.log('Node App start at port 9097')
})