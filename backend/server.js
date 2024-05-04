const express = require('express'); 
const cors = require('cors');
const crypto = require('crypto');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const commantRoutes= require('./routes/commantRoutes')
const bodyParser = require('body-parser')
const path = require('path');
const app = express(); 
const PORT = 3000;


app.use(cors()); // noch ändern nicht für alle 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);
app.use('/api/user',userRoutes);
app.use('/api/comments',commantRoutes);

//bilder public für das  Frontend 
const publicPath = path.join(__dirname, './public/');
app.use(express.static(publicPath));



//const jwt = crypto.randomBytes(32).toString('hex'); JWT Schlüssel-Generierung

//console.log(' JWT-Schlüssel:', jwt);      

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


server.on('error', (error) => {
    console.error('Server error:', error);
});