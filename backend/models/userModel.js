const pool = require("../config/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = null;
    }
    async register() {
        try {
            console.log(this.password)
            const hashPw = await bcrypt.hash(this.password, 10);
            const emailExists = await User.isEmailExists(this.email);

            if (!emailExists) {
                const db = await pool.getConnection();
                const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, hashPw]);
                if (result && result.insertId) {
                    this.id = Number(result.insertId);
                    const roleResult = await db.query('SELECT role FROM users WHERE userID = ?', [this.id]);
                    const token = await this.generateAuthToken(this.id, roleResult[0].role);
                    db.release();
                    return {
                        message: "Benutzer wurde registriert",
                        token: token
                    };
                } else {
                    throw new Error('Benutzer konnte nicht registriert werden');
                }
            } else {
                throw new Error('Benutzer mit dieser E-Mail-Adresse existiert bereits');
            }
        } catch (error) {
            throw new Error(`Fehler bei der Registrierung: ${error}`);
        }
    }

    async login() {
        try {
            const db = await pool.getConnection();
            const result = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [this.email]);
            if (Array.isArray(result) && result.length > 0) {
                const user = result[0];
                console.log(this.password);
                const isPasswordValid = await bcrypt.compare(this.password, user.password);
                console.log(isPasswordValid)
                if (isPasswordValid) {

                    const roleResult = await db.query('SELECT role FROM users WHERE userID = ?', [user.userID]);
                    db.release();
                    const userRole = roleResult && roleResult.length > 0 ? roleResult[0].role : 'user'; // Default role if not found

                    // Generate JWT token with user ID and role
                    const token = await this.generateAuthToken(user.userID, userRole);
                    return {
                        message: 'Erfolgreich eingeloggt',
                        token: token
                    };
                } else {
                    throw new Error('Ungültige Anmeldeinformationen');
                }
            } else {
                db.release(); // Freigabe der Verbindung, wenn kein Benutzer gefunden wurde
                throw new Error('Benutzer mit dieser E-Mail-Adresse wurde nicht gefunden');
            }
        } catch (error) {
            throw new Error(`Fehler beim Einloggen: ${error}`);
        }

    }

    async generateAuthToken(id, role) {
        console.log(id);
        const token = jwt.sign({
            id: id,
            email: this.email,
            role: role
        }, process.env.JWT_Key, {
            expiresIn: '1h'
        });
        return token;
    }

    static async isEmailExists(email) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('SELECT email FROM users WHERE email = ? LIMIT 1', [email]);
            db.release();
            return result.length > 0;
        } catch (error) {
            throw new Error(`Fehler beim Überprüfen der E-Mail-Adresse: ${error}`);
        }
    }
    static async findById(userId) {
        try {
            const db = await pool.getConnection();
            const result = await db.query('SELECT * FROM users WHERE userID = ?', [userId]);
            db.release();
            if (Array.isArray(result) && result.length > 0) {
                const user = result[0];
                return user;
            } else {
                throw new Error('Benutzer mit angegebener ID wurde nicht gefunden');
            }
        } catch (error) {
            throw new Error(`Fehler beim Abrufen des Benutzers: ${error}`);
        }
    }

}

module.exports = User;