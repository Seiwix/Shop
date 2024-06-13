const pool = require('../config/database');

class CheckoutItem {
    constructor(checkoutItemId, checkoutId, productId, quantity) {
        this.checkoutItemId = checkoutItemId;
        this.checkoutId = checkoutId;
        this.productId = productId;
        this.quantity = quantity;
    }

    async save() {
        try {
            const db = await pool.getConnection();
            await db.query(
                'INSERT INTO CheckoutItems (checkoutID, productID, quantity) VALUES (?, ?, ?)',
                [String(this.checkoutId), String(this.productId), String(this.quantity)]
            );
            db.release();
            return `Checkout-Item wurde hinzugefügt: CheckoutID = ${this.checkoutId}, ProductID = ${this.productId}`;
        } catch (error) {
            throw new Error(`Fehler beim Hinzufügen des Checkout-Items: ${error}`);
        }
    }

    static async getByCheckoutId(checkoutId) {
        try {
            const db = await pool.getConnection();
            console.log(checkoutId);
            const data = await db.query('SELECT * FROM CheckoutItems WHERE checkoutID = ?', [checkoutId]);
            db.release();
            if (!data.length) {
                throw new Error('Keine Checkout-Items gefunden');
            }
            return data.map(item => new CheckoutItem(item.checkout_item_id, item.checkout_id, item.product_id, item.quantity));
        } catch (error) {
            throw new Error(`Fehler beim Abrufen der Checkout-Items: ${error}`);
        }
    }
}

module.exports = CheckoutItem;