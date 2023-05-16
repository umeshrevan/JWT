const fs = require('fs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const crypto = require('crypto')
const users = require('../db.json')
const secretKey = 'secretkey';
function dataHashing(req, res) {
    const { username, password } = req.body
    const users = JSON.parse(fs.readFileSync('/Users/yudizsolutionsltd/Documents/NodeJs/express/v2/db.json', 'utf-8'))
    const user = users.usersData.find(obj => obj.username === username)
    if (!user) {
        res.end({ msg: "User not found" })
        return;
    }

    const hashedPassword = matchHashed(password)
    if (user.password !== hashedPassword) {
        res.end({ msg: "Data doesn't match" })
        return;
    }
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' })
    res.json(token)
}

function matchHashed(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
module.exports = { dataHashing } 