const mongoose = require('mongoose');
mongoose.connect('mongodb://abhay:mongodb@ds119489.mlab.com:19489/crackloophole');

exports.ExamDetail = new mongoose.Schema({
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    examName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    examDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    respectiveQuestionTableName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    isNegativeMarking: {
        type: Sequelize.BOOLEAN
    },
    negativeMarks: {
        type: Sequelize.INTEGER
    },
    noOfQuestions: {
        type: Sequelize.INTEGER
    }
});