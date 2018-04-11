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

exports.QuestionTable = (tableName) => {
    return sequelize.define('questionTable', {
        question: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: Sequelize.TEXT('long')
        },
        opt1: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        opt1isCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        opt2: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        opt2isCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        opt3: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        opt3isCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        opt4: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        opt4isCorrect: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        textAreaIsEnabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        freezeTableName: true,
        tableName: tableName
    })
}