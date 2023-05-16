const jwt = require('jsonwebtoken')
const users = require('../db.json')
const { isAuthorized } = require('../validators/userValidator');
const secretKey = 'secretkey';
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' })
        return;
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Forbiddenn' })
        }
        req.userId = decoded.id
        const user = users.usersData.find(obj => obj.id === decoded.id)
        if (!user || !isAuthorized(user.role, req.path, req.method)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    })
}
module.exports = { verifyToken }