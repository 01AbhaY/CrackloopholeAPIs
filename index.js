const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())


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

const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Name: Sequelize.STRING
})

const ExamDetail = sequelize.define('examDetail', {
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
        validate: {
            notEmpty: true
        }
    },
    isNegativeMarking: {
        type: Sequelize.BOOLEAN
    },
    negativeMarks: {
        type: Sequelize.INTEGER
    }
})

app.get('/user/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(users => {
        users != null ? res.send(users) : res.send({
            "status": false,
            "message": "No user with given ID."
        })
    }).catch(err => {
        res.send(err)
    })
})

app.post('/exam/submit', (req, res) => {

    ExamDetail.create({
        userID: req.body.userID,
        respectiveQuestionTableName: (((req.body.examName).toLowerCase()).concat(req.body.userID)).replace(/[^a-zA-Z0-9]/g, ''),
        examName: req.body.examName,
        examDuration: req.body.examDuration,
        isNegativeMarking: req.body.isNegativeMarking,
        negativeMarks: req.body.negativeMarks
    }).then((exam) => {

        const QuestionTable = sequelize.define('questionTable', {
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
            tableName: exam.respectiveQuestionTableName
        })

        QuestionTable.sync({
            force: true
        }).then(() => {

            for (let i = 1; i <= req.body.i; i++) {
                let questionTableData = {}

                questionTableData['question'] = req.body["question" + i]
                questionTableData['image'] = ((req.body.hasOwnProperty("image" + i)) ? req.body["image" + i] : null)

                questionTableData['opt1isCorrect'] = ((req.body.hasOwnProperty("q" + i + "opt1isCorrect")) ? (req.body["q" + i + "opt1isCorrect"]["0"] == "on" ? true : false) : false)
                questionTableData['opt1'] = req.body["q" + i + "opt1"]

                questionTableData['opt2isCorrect'] = ((req.body.hasOwnProperty("q" + i + "opt2isCorrect")) ? (req.body["q" + i + "opt2isCorrect"]["0"] == "on" ? true : false) : false)
                questionTableData['opt2'] = req.body["q" + i + "opt2"]

                questionTableData['opt3isCorrect'] = ((req.body.hasOwnProperty("q" + i + "opt3isCorrect")) ? (req.body["q" + i + "opt3isCorrect"]["0"] == "on" ? true : false) : false)
                questionTableData['opt3'] = req.body["q" + i + "opt3"]

                questionTableData['opt4isCorrect'] = ((req.body.hasOwnProperty("q" + i + "opt4isCorrect")) ? (req.body["q" + i + "opt4isCorrect"]["0"] == "on" ? true : false) : false)
                questionTableData['opt4'] = req.body["q" + i + "opt4"]

                questionTableData['textAreaIsEnabled'] = ((req.body.hasOwnProperty("textArea" + i)) ? (req.body["textArea" + i]["0"] == "on" ? true : false) : false)

                QuestionTable.create(questionTableData)
            }

        }).then((CBquestionTableData) => {
            res.send({
                "Message": "Thankyou! for creating exam with us.",
                "URL": "http://abhaypratapsingh/crackloophole/" + exam.respectiveQuestionTableName
            })
        }).catch((err) => {
            console.log('Error while creating exam: '.red + err)
            res.send({
                "Message": "Oops! we are unable to process this req."
            })
        })

    }).catch((err) => {
        console.log('Error while creating exam: '.red + err)
        res.send({
            "Message": "Oops! we are unable to process this req."
        })
    })
})

app.post('/user/register', (req, res) => {
    User.create({
            userName: req.body.userName,
            password: req.body.password,
            Name: req.body.Name
        })
        .then((user) => {
            res.send({
                "Message": "Thankyou " + user.Name + " for registering with us.",
                "ID": user.id,
                "userName": user.userName,
                "password": user.password,
                "Name": user.Name
            })
        })
        .catch((err) => {
            console.log('Error While registering User: '.red + err)
            res.send({
                "Message": "Oops! we are unable to process this req."
            })
        })
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.'.green.bgWhite)

        sequelize.sync({
                // force: true,
                logging: console.log
            })
            .then(() => {
                app.listen(process.env.PORT || 3005, () => console.log('-------------------------------------\nYeyeeee!! app listening on port 3005.'.green))
            })
            .catch((err) => {
                console.log('Unable to start app. Error is: '.red + err);
            })

    })
    .catch(err => {
        console.error('Unable to connect to the database:'.red, err)
    });