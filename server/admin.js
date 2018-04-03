const express = require('express');
const utils = require('utility')

const model = require('./model')

const User = model.getModel('user')
const Chat = model.getModel('chat')
const Router = express.Router();
const _filter = { pwd: 0, __v: 0 }

Router.get('/user/list', function (req, res) {
    // User.remove({}, function(e, d) { })
    const { type } = req.query
    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

Router.get('/info', function (req, res) {
    const { userid } = req.query;
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错, 请稍后重试' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
})

// chat

Router.get('/getmsgcount', function (req, res) {
    const { userid } = req.query
    User.count({_id: userid}, function (e, d) {
        return res.json({code: 0, data: d})
    })
})

Router.get('/getmsglist', function (req, res) {
    let users = {}
    const { userid } = req.query;
    User.find({}, function (e, d) {
        d.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        });
    })
    // { '@or': [{ from: user, to: user }] }
    Chat.find({ '$or': [{ from: userid }, { to: userid }] }, function (e, d) {
        if (!e) {
            return res.json({ code: 0, msgs: d, users: users })
        }
    })
})

module.exports = Router;