
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.upload, productController.addProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);
router.put('/update/:id',productController.upload , productController.updateProduct); // Bei Put wichtig upload hinzufügen  sonnst wird es als json  akzeptiert 
router.delete('/delete/:id',productController.deleteProduct);
module.exports = router; 