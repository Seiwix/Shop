require('dotenv').config();
const express = require('express'); 
const mariadb = require('mariadb');


const app = express(); 

const pool= mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});