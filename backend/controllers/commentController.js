const Commants = require('../models/commentModel');
const User = require('../models/userModel');

async function addComment(req, res) {
    const {
        userID,
        productID,
        commentText,
        starRating
    } = req.body;

    console.log(req.body);
    try {
        const user = await User.findById(userID);
        const comment = new Commants(userID, productID, commentText, starRating, user.username);
        const result = await comment.addCommant();
        res.status(201).json({
            message: result
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function getCommentsForProduct(req, res) {
    console.log(req.params);
    const {
        id
    } = req.params;

    try {
        const comments = await Commants.getCommantsForProduct(id);
        res.status(200).json({
            comments
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
async function getAverageRatingForProduct(req, res) {
    console.log(req.params);
    const {
        id
    } = req.params;

    try {
        const rating = await Commants.getAverageRatingForProduct(id);
        res.status(200).json({
            rating
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
async function getRatingDistributionForProduct(req, res) {
    const {
        id
    } = req.params;

    try {


        const {
            ratingDistribution,
            totalRatings
        } = await Commants.getRatingDistributionForProduct(id);

        const ratingDistributionString = ratingDistribution.map(entry => ({
            starRating: entry.starRating,
            ratingCount: entry.ratingCount.toString()
        }));
        res.status(200).json({
            ratingDistribution: ratingDistributionString,
            totalRatings: totalRatings.toString()
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    addComment: addComment,
    getCommentsForProduct: getCommentsForProduct,
    getAverageRatingForProduct: getAverageRatingForProduct,
    getRatingDistributionForProduct: getRatingDistributionForProduct,
};