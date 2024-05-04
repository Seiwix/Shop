const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Kein JWT-Token vorhanden' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Key);
        req.user = decoded;
        console.log(decoded.id);
        const user = await User.findById(decoded.id);
        if (!user || (decoded.role !== 'admin' && decoded.role !== 'user')) {
            return res.status(403).json({ error: 'Ungültige Benutzerinformationen' });
        }

        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'JWT-Token ist abgelaufen' });
        }
        return res.status(403).json({ error: 'Ungültiges JWT-Token' });
    }
}


module.exports = {
    verifyToken: verifyToken
};