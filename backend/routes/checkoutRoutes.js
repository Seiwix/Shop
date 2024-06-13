const express = require('express');
const router = express.Router();
const ordersController =require('../controllers/ordersController');

router.post('/',ordersController.createCheckout);
router.get('/',ordersController.getAllCheckouts);

module.exports = router;