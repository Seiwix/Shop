const pool = require('../config/database');

class Checkout {
    constructor(checkoutId, userId, firstName, lastName, address, city, zip, total, createdAt) {
        this.checkoutId = checkoutId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.total = total;
        this.createdAt = createdAt;
    }

    async save() {
        try {
            const db = await pool.getConnection();
            const result = await db.query(
                'INSERT INTO Checkouts (userID, firstName, lastName, address, city, zip, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [parseInt(this.userId), this.firstName, this.lastName, this.address, this.city, String(this.zip), parseFloat(this.total)]
            );
            db.release();
            this.checkoutId = result.insertId;
            return `Checkout wurde hinzugefügt: ${this.checkoutId}`;
        } catch (error) {
            throw new Error(`Fehler beim Hinzufügen des Checkouts: ${error}`);
        }
    }
    

    static async getById(checkoutId) {
        try {
            const db = await pool.getConnection();
            const data = await db.query('SELECT * FROM Checkouts WHERE checkout_id = ?', [checkoutId]);
            db.release();
            if (!data.length) {
                throw new Error('Checkout wurde nicht gefunden');
            }
            const { checkout_id, user_id, first_name, last_name, address, city, postal_code, total, created_at } = data[0];
            return new Checkout(checkout_id, user_id, first_name, last_name, address, city, postal_code, total, created_at);
        } catch (error) {
            throw new Error(`Fehler beim Abrufen des Checkouts: ${error}`);
        }
    }
    static async getAll() {
        try {
            const db = await pool.getConnection();
            const data = await db.query('SELECT * FROM Checkouts');
            db.release();
            if (!data.length) {
                throw new Error('Keine Checkouts gefunden');
            }
            return data.map(item => new Checkout(
                item.checkoutID,
                item.userID,
                item.firstName,
                item.lastName,
                item.address,
                item.city,
                item.zip,
                item.total,
                item.created_at
            ));
        } catch (error) {
            throw new Error(`Fehler beim Abrufen der Checkouts: ${error}`);
        }
    }
}

module.exports = Checkout;