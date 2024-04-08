const express = require('express'); 
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser')
const path = require('path');
const app = express(); 
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);
app.use('/api/user',userRoutes);

//bilder public für das  Frontend 
const publicPath = path.join(__dirname, './public/');
app.use(express.static(publicPath));





const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


server.on('error', (error) => {
    console.error('Server error:', error);
});