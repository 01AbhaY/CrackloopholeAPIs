const userModal = require('../modals/user');

exports.registerUser = (req, res) => {
    userModal.User.create({
        "userName": req.body.userName,
        "password": req.body.password,
        "Name": req.body.Name
    }, (err, user) => {

        console.log(user);

        if (!err && user != null) {
            res.send({
                "isValid": true,
                "Message": "Thankyou " + user.Name + " for registering with us.",
                "ID": user.id,
                "userName": user.userName,
                "password": user.password,
                "Name": user.Name
            })
        } else {
            console.log('Error While registering User: '.red + err)
            res.send({
                "isValid": false,
                "Message": "Oops! we are unable to process this req."
            })
        }
    })
}

exports.checkLogin = (req, res) => {
    userModal.User.findOne({
        "userName": req.body.userName,
        "password": req.body.password
    }, (err, doc) => {
        if (!err && doc != null) {
            res.status(200).send({
                "isValid": true,
                "ID": doc.id,
                "userName": doc.userName,
                "password": doc.password,
                "Name": doc.Name
            })
        } else {
            res.send({
                "isValid": false,
                "message": "Invalid Credentials!"
            })
        }
    })
}

exports.getUserByID = (req, res) => {
    userModal.User.findOne({
        _id: req.params.id
    }, (err, doc) => {
        doc != null || doc != undefined ? res.send(doc) : res.send({
            "status": false,
            "message": "No user with given ID."
        })
    })
}