
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/', productController.upload, productController.addProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);
router.put('/:id',productController.upload , productController.updateProduct); // Bei Put wichtig upload hinzufügen  sonnst wird es als json  akzeptiert 
router.delete('/:id',productController.deleteProduct);
module.exports = router; 