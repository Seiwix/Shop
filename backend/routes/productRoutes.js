
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const auth = require('../middleware/authMiddleware');
router.post('/',auth.verifyToken, productController.upload, productController.addProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);
router.put('/:id',auth.verifyToken,productController.upload , productController.updateProduct); // Bei Put wichtig upload hinzufügen  sonnst wird es als Json  akzeptiert 
router.delete('/:id',productController.deleteProduct);
module.exports = router; 