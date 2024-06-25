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
            const result = await db.query('INSERT INTO comments (userID, productID, commentText, starRating, username) VALUES (?, ?, ?, ?, ?)', [this.userID, this.productID, this.commentText, this.starRating, this.username]);
            db.release();
            if (result && result.insertId) {
                this.comment_id = Number(result.insertId);
                return "Bewertung erfolgreich gespeichert";
            } else {
                throw new Error('Bewertnug konnte nicht gespeichert werden');
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
            return result;
        } catch (error) {
            throw new Error(`Fehler beim Abrufen der Bewertungen für das Produkt: ${error}`);
        }
    }

    static async getAverageRatingForProduct(productID) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('SELECT ROUND(AVG(starRating), 1) AS avgRating FROM comments WHERE productID = ?', [productID]);
            db.release();
            return result;
        } catch (error) {
            throw new Error(`Fehler beim Abrufen der durchschnittlichen Bewertung: ${error}`);
        }
    }

    static async getRatingDistributionForProduct(productID) {
        try {
            const db = await pool.getConnection();
            const ratingDistribution = await db.query('SELECT starRating, COUNT(*) AS ratingCount FROM comments WHERE productID = ? GROUP BY starRating ORDER BY starRating ASC', [productID]);
            const totalRatingsResult = await db.query('SELECT COUNT(*) AS totalRatings FROM comments WHERE productID = ?', [productID]);
            db.release();
            const totalRatings = totalRatingsResult[0].totalRatings;
            return { ratingDistribution, totalRatings };
        } catch (error) {
            throw new Error(`Fehler beim Abrufen der Bewertungsverteilung: ${error}`);
        }
    }

    static async updateComment(userID, commentID, commentText, starRating) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('UPDATE comments SET commentText = ?, starRating = ? WHERE comment_id = ? AND userID = ?', [commentText, starRating, commentID, userID]);
            if (result.affectedRows > 0) {
                const updatedComment = await db.query('SELECT * FROM comments WHERE comment_id = ? AND userID = ?', [commentID, userID]);
                console.log(updatedComment);
                db.release();
                if (updatedComment.length > 0) {
                    return updatedComment[0];
                } else {
                    throw new Error('Aktualisiertes Kommentar konnte nicht gefunden werden');
                }
            } else {
                db.release();
                throw new Error('Kommentar konnte nicht aktualisiert werden');
            }
        } catch (error) {
            throw new Error(`Fehler beim Aktualisieren des Kommentars: ${error}`);
        }
    }

    static async deleteCommant(userID, commentID) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('DELETE FROM comments WHERE comment_id = ? AND userID= ?', [commentID, userID]);
            db.release();
            if (result.affectedRows > 0) {
                return "Bewertung erfolgreich gelöscht";
            } else {
                throw new Error('Bewertung konnte nicht gelöscht werden');
            }
        } catch (error) {
            throw new Error(`Fehler beim Löschen der Bewertung: ${error}`);
        }
    }
}

module.exports = Commants;