const users = require('../db.json');
function dataUpdator(req, res, next) {
    const { username, password } = req.body
    const usernameRegex = /^[A-Z][0-9]*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (usernameRegex.test(username) == false) {
        res.end({ msg: "Enter valid Username" })
    }
    else if (passwordRegex.test(password) == false) {
        res.end({ msg: "Enter valid Password" })
    }
    else {
        next()
    }
}
module.exports = { dataUpdator }