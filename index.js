const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')

const userController = require('./controllers/user');
const examController = require('./controllers/exam');

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

app.get('/user/:id', userController.getUserByID)

app.post('/user/register', userController.registerUser)

app.post('/user/checklogin', userController.checkLogin)

app.get('/exam/:uniqueName', examController.getExam)

app.post('/exam/submit', examController.submitExam)

sequelize
    .authenticate()
    .then(() => {
        app.listen(process.env.PORT || 3005, () => console.log('-----------------------------------------------------------\nYeyeeee!! connected to DB and app is listening on port 3005'.green))
    })
    .catch(err => {
        console.error('Unable to connect to the database:'.red, err)
    });