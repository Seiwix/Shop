const pool = require('../config/database');

class Product {
    constructor(id, name, description, price, stockQuantity, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
    }

    async save() {
        try {
            const db = await pool.getConnection();
            console.log("test"+this.stockQuantity,this.imageUrl)
            await db.query('INSERT INTO products (name, description, price, stockQuantity, imageUrl) VALUES (?, ?, ?, ?, ?)', [this.name, this.description, this.price, this.stockQuantity, this.imageUrl]);
            db.release();
            return  'Produkt wurde hinzugefügt'+ this.stockQuantity,this.imageUrl ;
        } catch (error) {
            throw new Error(`Fehler beim Hinzufügen eines Produktes: ${error}`);
        }
    }

  
    static async getById(productId) {
        try {
            const db = await pool.getConnection();
            const data = await db.query('SELECT * FROM products WHERE id = ?', [productId.id]);
            db.release(); 
            if (!data.length) 
            { 
                throw new Error('Produkt wurde nicht gefunden');
            }
            const { id, name, description, price, stockQuantity, imageUrl } = data[0];
            return new Product(id, name, description, price, stockQuantity, imageUrl);
        } catch (error) {
            throw new Error(`Fehler beim Abrufen des Produktes: ${error}`);
        }
    }

    static async getAll(){
        try{
            const db = await pool.getConnection();
            const datas = await  db.query('SELECT * FROM products');
            console.log(datas);
            db.release();
            return datas.map(data => new Product(data.id,data.name,data.description,data.price, data.stockQuantity,data.imageUrl));
        }catch(error){
            throw new Error(`Fehler beim Abrufen der Produkte: ${error}`);
        }
    }
    async update(productid) {
        try {
            const db = await pool.getConnection();
            await db.query('UPDATE products SET name = ?, description = ?, price = ?, stockQuantity = ?, imageUrl = ? WHERE id = ?', [this.name, this.description, this.price, this.stockQuantity, this.imageUrl, productid.id]);
            db.release();
            return 'Produkt wurde aktualisiert';
        } catch (error) {
            throw new Error(`Fehler beim Aktualisieren des Produktes: ${error}`);
        }
    }

   static async delete(productid) {
        try {
            const db = await pool.getConnection();
           
            await db.query('DELETE FROM products WHERE id = ?', [productid.id]);
            db.release();
            return 'Produkt wurde  gelöscht';
        } catch (error) {
            throw new Error(`Fehler beim  Löschen des Produktes: ${error}`);
        }
    }

}

module.exports = Product;