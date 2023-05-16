const fs = require('fs')
const crypto = require('crypto')
const users = require('../db.json');

const insertUser = (req, res) => {
  const user = { id, username, email, password } = req.body
  const users = JSON.parse(fs.readFileSync('/Users/yudizsolutionsltd/Documents/NodeJs/express/v2/db.json', 'utf-8'))
  user.password = hashPassword(password)
  users.usersData.push(user)
  fs.writeFileSync('/Users/yudizsolutionsltd/Documents/NodeJs/express/v2//db.json', JSON.stringify(users), 'utf-8')
  //jsondata.push({username:req.body.username,email:req.body.email,password:req.body.password})

  res.end("Data Added to db.json file")

}
const updateUser = (req, res) => {
  const id = req.params.id
  const username = req.body.username
  const password = req.body.password
  //console.log(id);
  const users = JSON.parse(fs.readFileSync('/Users/yudizsolutionsltd/Documents/NodeJs/express/v2/db.json', 'utf-8'))
  const user = users.usersData.find(obj => obj.id === id)
  if (user) {
    user.username = username
    user.password = password
    fs.writeFileSync('/Users/yudizsolutionsltd/Documents/NodeJs/express/v2//db.json', JSON.stringify(users), 'utf-8')
    res.end("Data updated successfully")
  }
  else {
    res.end("User doesn't exists")
  }
}

function hashPassword(password) {
  //const password = req.body.password
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  console.log(hashedPassword);
  return hashedPassword;
}
function isAuthorized(role, path, method) {
  console.log("yes");
  if (role === 'admin' || path.startsWith('/user')) {
    console.log("no");
    return true;
  }

  return false;
}

module.exports = { insertUser, updateUser, isAuthorized }