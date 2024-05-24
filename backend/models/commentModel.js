const pool = require("../config/database");

class Commants {
    constructor(userID, productID, commentText, starRating, username) {
        this.userID = userID;
        this.productID = productID;
        this.commentText = commentText;
        this.starRating = starRating;
        this.username = username;
    }

    async addCommant() {
        try {
            const db = await pool.getConnection();
            const result = await db.query('INSERT INTO comments (userID, productID, commentText, starRating,username) VALUES (?, ?, ?, ?,?)', [this.userID, this.productID, this.commentText, this.starRating, this.username]);
            if (result && result.insertId) {
                this.comment_id = Number(result.insertId);
                db.release();
<<<<<<< Updated upstream
                return "Bewertung erfolgreich gespeichert";
=======
                return "Bewertung wurde erfolgreich gespeichert";
>>>>>>> Stashed changes
            } else {
                throw new Error('Bewertung konnte nicht gespeichert werden');
            }
        } catch (error) {
            throw new Error(`Fehler beim Speichern der Bewertung: ${error}`);
        }
    }
    static async getCommantsForProduct(productID) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('SELECT * FROM comments WHERE productID = ?', [productID]);
            db.release();
            console.log(result);
            return result;
        } catch (error) {
<<<<<<< Updated upstream
            throw new Error(`Fehler beim Abrufen der Bewertungen für das Produkt: ${error}`);
=======
            throw new Error(`Fehler beim Abrufen der Bewrtungen für das Produkt ${error}`);
>>>>>>> Stashed changes
        }
    }
    static async getAverageRatingForProduct(productID) {
        const db = await pool.getConnection();
        const result = await db.query('SELECT ROUND(AVG(starRating), 1) AS avgRating FROM comments WHERE productID = ?', [productID]);
        db.release();
        return result;
    }
    static async getRatingDistributionForProduct(productID) {
        const db = await pool.getConnection();

        const ratingDistribution = await db.query(` SELECT  starRating,COUNT(*) AS ratingCount FROM comments  WHERE productID = ?  GROUP BY starRating  ORDER BY  starRating ASC`, [productID]);
        console.log(ratingDistribution);

       const totalRatingsResult = await db.query(` SELECT COUNT(*) AS totalRatings FROM  comments  WHERE productID = ?`, [productID]);

        db.release();

       const totalRatings = totalRatingsResult[0].totalRatings;
        console.log()
        return  {ratingDistribution,
            totalRatings
        };
    }


}

module.exports = Commants;