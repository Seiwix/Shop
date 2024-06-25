const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

//auth.verifyToken
router.post('/', auth.verifyToken, commentController.addComment);
router.get('/:id', commentController.getCommentsForProduct);
router.put('/:id', auth.verifyToken, commentController.updateComment);
router.delete('/', auth.verifyToken, commentController.deleteComment);
router.get('/star/:id', commentController.getAverageRatingForProduct);
router.get('/stars/:id', commentController.getRatingDistributionForProduct);

module.exports = router;