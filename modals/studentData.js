const mongoose = require('mongoose')
mongoose.connect('mongodb://abhay:mongodb@ds119489.mlab.com:19489/crackloophole');

const studentDataSchema = new mongoose.Schema({
    nameOfStudent: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number
    }
}, {
    strict: false
})

exports.StudentData = (tableName) => {
    return mongoose.model(tableName.toString(), studentDataSchema, tableName.toString())
}