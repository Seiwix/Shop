const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'kein JWT token vorhanden' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Key);
        console.log(decoded);

        req.user = decoded;

      

        const user = await User.findById(decoded.id);

        if (!user || (decoded.role !== 'admin' && decoded.role !== 'user')) {
            return res.status(403).json({ error: 'Ungültige Benutzerinformatioen' });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'JWT token ist abgelaufen' });
        }
        return res.status(403).json({ error: 'ungültiges JWT token' });
    }
}


module.exports = {
    verifyToken: verifyToken
};