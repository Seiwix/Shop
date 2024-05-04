const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');
//auth.verifyToken
router.post('/', commentController.addComment);
router.get('/:id',commentController.getCommentsForProduct);
router.get('/star/:id',commentController.getAverageRatingForProduct);
router.get('/stars/:id',commentController.getRatingDistributionForProduct);

module.exports = router;