const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.post('/register', userController.register);


router.post('/login', userController.login);


router.get('/admin', auth.verifyToken, (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Nur Administratoren haben Zugriff auf diesen Endpunkt' });
        }
        
        

        res.status(200).json({ role:'admin'});
    } catch (error) {
        console.error('Fehler beim Zugriff auf den Admin-Endpunkt:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
   
});

module.exports = router;

