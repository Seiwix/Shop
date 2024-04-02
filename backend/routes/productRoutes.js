
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.upload, productController.addProduct);
router.get('/get',productController.getProducts);
router.get('/get/:id',productController.getProductById);
router.put('/update/:id',productController.updateProduct);
module.exports = router; 