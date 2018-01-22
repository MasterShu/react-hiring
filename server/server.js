import express from 'express';
import bodyParser from'body-parser'
import cookieParse from'cookie-parser'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook';
import path from'path'
import React from 'react';
import {renderToNodeStream} from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { StaticRouter } from "react-router-dom";

import staticPath from '../build/asset-manifest';
import App from '../src/App';
import reducers from '../src/reducer';
import model from'./model'
import userRouter from'./user'
const Chat = model.getModel('chat')

assethook({
    extensions: ['png'],
    mimetype: 'image/png',
    limit: 10000
})

// new APP
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
    console.log('user login')
    socket.on('sendmsg', function (data) {
        console.log(data)
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg, create_time: new Date().getTime() }, function (e, d) {
            io.emit('recvmsg', Object.assign({}, d._doc))
        })
    })
})

app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function(req, res, next) {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }

    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));
    let context = {}
    res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>React App</title>
    <link rel="stylesheet" href="/${staticPath['main.css']}"/>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">
    `)
    const markupStream = renderToNodeStream(
        (<Provider store={store} >
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App />
            </StaticRouter>
        </Provider>)
    )

    markupStream.pipe(res, {end: false})
    markupStream.on('end', () => {
        res.write(`
        </div>
            <script src="/${staticPath['main.js']}"></script>    
                
        </body>
        </html>
        `)
        res.end()
    })
})
app.use('/', express.static(path.resolve('build')))


server.listen(9097, function() {
    console.log('Node App start at port 9097')
})