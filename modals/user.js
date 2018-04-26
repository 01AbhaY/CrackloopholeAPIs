const mongoose = require('mongoose')
mongoose.connect('mongodb://abhay:mongodb@ds119489.mlab.com:19489/crackloophole');

const userTableSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Name: String
})

exports.User = mongoose.model('user', userTableSchema)