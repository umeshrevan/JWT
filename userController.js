const users = require('../db.json');
function dataValidator(req, res, next) {

    const { id, username, email, password } = req.body
    const usernameRegex = /^[A-Z][0-9]*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const existEmail = users.usersData.find(obj => obj.email === email)
    const existUsername = users.usersData.find(obj => obj.username === username) //2 line users
    const existId = users.usersData.find(obj => obj.id === id) //2 nd
    if (usernameRegex.test(username) == false) {
        res.end("Enter valid Username")
    }
    else if (passwordRegex.test(password) == false) {
        console.log(passwordRegex.test(password))
        res.end({ msg: "Enter valid Password" })
    }
    else if (existUsername) {
        res.end({ msg: "Email is already taken" });
    }
    else if (existEmail) {
        res.end({ msg: "Email is already taken" });
    }
    else if (existId) {
        res.end({ msg: "Id already exist" })
    }
    else {
        next()
    }
}
module.exports = { dataValidator }