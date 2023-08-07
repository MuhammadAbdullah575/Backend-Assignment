//deals authentication

const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const token = req.header('token');  
    console.log(token);
    if (!token)
        return res.status(401).send('Access denied. No token provided.');
    try {

        const decoded = jwt.verify(token,  'your-secret-key');
        req.email= decoded;
        console.log(req.email);
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;

