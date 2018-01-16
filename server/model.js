const mongoose = require('mongoose')

// connect MongoDB && use hiring
const DB_URL = 'mongodb://127.0.0.1:27017/hiring'
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {type: String, 'require': true},
        'pwd': { type: String, 'require': true },
        'type': {type: String, 'require': true},
        'avatar': { type: String },
        'desc': { type: String},
        'title': {type: String},
        // Boos
        'company': { type: String },
        'money': {type: String},
    },
    chat: {

    }
}

for (const m in models) {
    if (models.hasOwnProperty(m)) {
        mongoose.model(m, new mongoose.Schema(models[m]))
    }
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}