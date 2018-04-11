const Sequelize = require('sequelize')

const sequelize = new Sequelize('crackloophole', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

exports.ExamDetail = sequelize.define('examDetail', {
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
})