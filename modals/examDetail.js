const mongoose = require('mongoose');
mongoose.connect('mongodb://abhay:mongodb@ds119489.mlab.com:19489/crackloophole');

const examDetailSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    examDuration: {
        type: Number,
        required: true
    },
    isNegativeMarking: {
        type: Boolean
    },
    negativeMarks: {
        type: Number
    },
    noOfQuestions: {
        type: Number
    }
});

exports.ExamDetail = mongoose.model('examDetail', examDetailSchema);