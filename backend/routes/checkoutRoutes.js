const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth.verifyToken, ordersController.createCheckout);
router.get('/', auth.verifyToken, ordersController.getAllCheckouts);
router.get('/:id', auth.verifyToken, ordersController.getCheckoutsByUserId);

module.exports = router;