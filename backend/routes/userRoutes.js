const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
router.post('/re',userController.register);


// als json senden  application/json postman 
module.exports = router;

