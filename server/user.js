const express = require('express');
const utils = require('utility')

const model = require('./model')

const User = model.getModel('user')
const Router = express.Router();
const _filter = { pwd: 0, __v: 0}

Router.get('/list', function(req, res) {
    // User.remove({}, function(e, d) { })
    const {type} = req.query
   User.find({type}, function(err, doc) {
       return res.json({code: 0, data: doc})
   }) 
})
Router.get('/info', function(req, res) {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({ code: 1 })        
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错, 请稍后重试' })        
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})
Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user: user}, function(err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function(e, d) {
            if (e) {
                return res.json({ code: 1, msg: '服务器出错, 稍后重试' })
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id}})
        })
    })
})
Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
        if (!doc) {
            return res.json({code:1, msg: '用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})
Router.post('/update', function(req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 })
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data: data })        
    })
})

function md5Pwd(pwd) {
    const salt = 'go_on..';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;