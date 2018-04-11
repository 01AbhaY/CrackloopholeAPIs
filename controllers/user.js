const userModal = require('../modals/user');

exports.registerUser = (req, res) => {
    userModal.User.create({
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
}

exports.checkLogin = (req, res) => {
    User.findOne({
            where: {
                userName: req.body.userName,
                password: req.body.password
            }
        })
        .then((user) => {
            res.status(200).send({
                "isValid": true,
                "ID": user.id,
                "userName": user.userName,
                "password": user.password,
                "Name": user.Name
            })
        })
        .catch((err) => {
            console.log('Error While Verifying User: '.red.bgWhite)
            console.log(err);
            res.send({
                "isValid": false,
                "Error": "Invalid credentials"
            })
        })
}

exports.getUserByID = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        user != null ? res.send(user) : res.send({
            "status": false,
            "message": "No user with given ID."
        })
    }).catch(err => {
        res.send(err)
    })
}