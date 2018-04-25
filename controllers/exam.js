const examDetailModal = require('../modals/examDetail');
const questionTableModal = require('../modals/questionTable');


exports.submitExam = (req, res) => {
    examDetailModal.ExamDetail.create({
        "userID": req.body.userID,
        "examName": req.body.examName,
        "examDuration": req.body.examDuration,
        "isNegativeMarking": ((req.body.hasOwnProperty("isNegativeMarking")) ? (req.body["isNegativeMarking"]["0"] == "on" ? true : false) : false),
        "negativeMarks": req.body.negativeMarks,
        "noOfQuestions": req.body.noOfQuestions
    }, (err, exam) => {

        if (!err && exam != null) {

            try {
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

                    questionTableModal.QuestionTable(exam._id).create(questionTableData)
                }
                msg = "QuestionTable created."
            } catch (err) {
                msg = "QuestionTable not created."
            }

            res.send({
                "isValid": true,
                "URL": "https://crackloophole-ui.herokuapp.com/exam-" + exam._id,
                "isQuestionTableCreated": msg,
                "exam": exam
            })

        } else {
            res.send({
                "Message": "Oops! we are unable to process this req.",
                "error": err
            })

        }
    })
}

exports.getExam = (req, res) => {
    questionTableModal.QuestionTable(req.params.examID).find({}, (err, exam) => {
        if (!err && exam != null) {

            examDetailModal.ExamDetail.find({
                "_id": req.params.examID
            }, (err, examinerDetails) => {

                if (!err && exam != null) {
                    res.send({
                        "paperId": req.params.examID,
                        "examinerDetails": examinerDetails,
                        "questions": exam
                    });
                }
            })


        } else {
            res.send({
                "message": "error"
            })
        }
    })
}