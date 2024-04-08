const pool = require("../config/database");
const bcrypt  = require('bcryptjs');

class User{
    constructor(username,email,password)
    {
        this.username = username; 
        this.email= email; 
        this.password = password; 
    }
    async register(){
        try{
            const hashPw = await bcrypt.hash(this.password ,10);
            const emailExists = await isEmailExists(this.email);
            if (!emailExists) {
                const db = await pool.getConnection();
                console.log(this.username,this.email,this.password)
                await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, hashPw])
                db.release();
                return "User wurde Regestiert";
            }else
            {
                throw new Error('Benutzer mit dieser E-Mail-Adresse existiert bereits');
            }
            
        }catch(error)
        {
            throw new Error(`Fehler  bei der Registrierung : ${error}`);
        }
    }
    
}
async function isEmailExists(email) {
    try {
        const db = await pool.getConnection();
        const result = await db.query('SELECT email FROM users WHERE email = ? LIMIT 1', [email]);
        db.release();
        return result.length > 0;
    } catch (error) {
        throw new Error(`Fehler beim Überprüfen der E-Mail-Adresse: ${error}`);
    }
}
module.exports = User; 