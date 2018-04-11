const examDetailModal = require('../modals/examDetail');


exports.getExam = (req, res) => {
    const questionTableModal = require('../modals/questionTable');

    questionTableModal.QuestionTable(req.params.uniqueName).findAll().then((data) => {
        examDetailModal.ExamDetail.findOne({
            where: {
                respectiveQuestionTableName: req.params.uniqueName
            }
        }).then(examDtailData => {
            examDtailData.dataValues['questions'] = data
            res.send(examDtailData)
        })
    }).catch(err => {
        res.send(err)
    })

}

exports.submitExam = (req, res) => {

    examDetailModal.ExamDetail.create({
        userID: req.body.userID,
        respectiveQuestionTableName: (((req.body.examName).toLowerCase()).concat(req.body.userID)).replace(/[^a-zA-Z0-9]/g, ''),
        examName: req.body.examName,
        examDuration: req.body.examDuration,
        isNegativeMarking: req.body.isNegativeMarking,
        negativeMarks: req.body.negativeMarks,
        noOfQuestions: req.body.noOfQuestions
    }).then((exam) => {
        const questionTableModal = require('../modals/questionTable');

        questionTableModal.QuestionTable(exam.respectiveQuestionTableName).sync({
            force: true
        }).then(() => {

            for (let i = 1; i <= req.body.noOfQuestions; i++) {
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

                questionTableModal.QuestionTable.create(questionTableData)
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
}