const express = require('express');
const { dataValidator } = require('../controller/userController')
const { dataUpdator } = require('../controller/updateController')
const { dataHashing } = require('../middleware/userMiddleware')
const { insertUser, updateUser } = require('../validators/userValidator');
const { verifyToken } = require('../middleware/verifyMiddleware')
const router = express.Router()
//const app= require('../index')


router.post("/", dataValidator, insertUser)
router.put("/:id", dataUpdator, updateUser)
router.post("/login", dataHashing)
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "protected route access successfully" })
})
router.get('/user/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected user route accessed successfully' });
});

module.exports = router;