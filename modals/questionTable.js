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
    opt1isCorrect: {
        type: Boolean,
        default: false
    },
    opt2: {
        type: String,
        required: true
    },
    opt2isCorrect: {
        type: Boolean,
        default: false
    },
    opt3: {
        type: String,
        required: true
    },
    opt3isCorrect: {
        type: Boolean,
        default: false
    },
    opt4: {
        type: String,
        required: true
    },
    opt4isCorrect: {
        type: Boolean,
        default: false
    },
    textAreaIsEnabled: {
        type: Boolean,
        default: false
    }
})

exports.QuestionTable = (tableName) => {
    return mongoose.model(tableName.toString(), questionTableSchema, tableName.toString())
}