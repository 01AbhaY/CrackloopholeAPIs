const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const emojic = require("emojic")

const userController = require('./controllers/user');
const examController = require('./controllers/exam');

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

app.get('/user/:id', userController.getUserByID)

app.post('/user/register', userController.registerUser)

app.post('/user/checklogin', userController.checkLogin)

app.get('/exam/:examID', examController.getExam)

app.post('/exam/submit', examController.submitExam)

app.get('/examlist/:userID', examController.getExamList)

app.post('/exam/submitStudentData', examController.submitStudentData)


app.listen(process.env.PORT || 3005, () => console.log(emojic.heartEyes + '---Yeyeeee!! connected to DB and app is listening on port 3005'.green))