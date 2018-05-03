const examDetailModal = require('../modals/examDetail');
const questionTableModal = require('../modals/questionTable');
const studentDataModal = require('../modals/studentData');


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
                    questionTableData['image'] = ((req.body.hasOwnProperty("blobImage" + i)) ? req.body["blobImage" + i] : null)

                    questionTableData['opt1'] = req.body["q" + i + "opt1"]

                    questionTableData['opt2'] = req.body["q" + i + "opt2"]

                    questionTableData['opt3'] = req.body["q" + i + "opt3"]

                    questionTableData['opt4'] = req.body["q" + i + "opt4"]

                    questionTableData['optCBs'] = req.body["q" + i + "opts"]

                    questionTableData['textAreaIsEnabled'] = ((req.body.hasOwnProperty("textArea" + i)) ? (req.body["textArea" + i]["0"] == "on" ? true : false) : false)

                    questionTableModal.QuestionTable(exam._id).create(questionTableData)
                }
                msg = "QuestionTable created."
            } catch (err) {
                msg = "QuestionTable not created."
            }

            res.send({
                "isValid": true,
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
        if (!err && exam != null && exam.length !== 0) {

            examDetailModal.ExamDetail.find({
                "_id": req.params.examID
            }, (err, examinerDetails) => {

                if (!err && examinerDetails != null && examinerDetails.length != 0) {
                    res.send({
                        "paperId": req.params.examID,
                        "examinerDetails": examinerDetails,
                        "questions": exam
                    });
                } else {
                    res.send({
                        "isValid": false,
                        "message": "Couldn'y find respective examiner Detail."
                    })
                }
            })


        } else {
            res.send({
                "isValid": false,
                "message": "No exam with ID " + req.params.examID
            })
        }
    })
}

exports.getExamList = (req, res) => {
    examDetailModal.ExamDetail.find({
        "userID": req.params.userID
    }, (err, examList) => {
        if (!err && examList != null && examList.length != 0) {
            res.send(examList);
        } else {
            res.send({
                "isValid": false,
                "message": "Couldn't find respective Examlist.",
                "error": err != null ? err : "Empty list."
            })
        }
    })

}

exports.submitStudentData = (req, res) => {


    questionTableModal.QuestionTable(req.body.examID).find({}, (err, questions) => {

        let answers = [];
        questions.forEach(question => {
            answers.push({
                "realAnswer": question.optCBs,
                "submittedAnswer": req.body['q-' + question._id + '-opts'],
                "isCorrect": (JSON.stringify(question.optCBs) === JSON.stringify(req.body['q-' + question._id + '-opts'])) ? true : false
            });
        })


        studentDataModal.StudentData(req.body.examID + "-StudentData").create({
            "examID": req.body.examID,
            "nameOfStudent": req.body.nameOfStudent,
            "rollNumber": req.body.rollNumber,
            "branch": req.body.branch,
            "year": req.body.year,
            "additionalDetails": req.body.additionalDetails,
            "answers": answers
        }, (err, data) => {

            if (!err && data != null) {

                res.send({
                    "isValid": true,
                    "collection": req.body.examID + "-StudentData",
                    "data": data
                })

            } else {
                res.send({
                    "Message": "Oops! we couldn't submit your exam.",
                    "error": err
                })

            }
        })
    })
}

exports.getExamDetailsByID = (req, res) => {
    examDetailModal.ExamDetail.findOne({
        "_id": req.params.examID
    }, (err, examDetails) => {
        if (!err && examDetails != null && examDetails.length != 0) {
            studentDataModal.StudentData(req.params.examID + "-StudentData").find({}, (err2, studentData) => {
                if (!err2 && studentData != null && studentData.length != 0) {
                    res.send({
                        "isValid": true,
                        "examDetails": examDetails,
                        "studentData": studentData
                    });
                } else {
                    res.send({
                        "isValid": false,
                        "examDetails": examDetails
                    });
                }
            })
        } else {
            res.send({
                "isValid": false,
                "message": "Couldn't find examDeatils for ID: " + req.params.examID
            })
        }
    })
}