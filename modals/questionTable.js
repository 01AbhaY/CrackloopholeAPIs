const mongoose = require('mongoose')
mongoose.connect('mongodb://abhay:mongodb@ds119489.mlab.com:19489/crackloophole');

const questionTableSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    opt1: {
        type: String,
        required: true
    },
    opt2: {
        type: String,
        required: true
    },
    opt3: {
        type: String,
        required: true
    },
    opt4: {
        type: String,
        required: true
    },
    optCBs: {
        type: Array
    },
    textAreaIsEnabled: {
        type: Boolean,
        default: false
    }
})

exports.QuestionTable = (tableName) => {
    return mongoose.model(tableName.toString(), questionTableSchema, tableName.toString())
}