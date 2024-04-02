const express = require('express'); 
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const app = express(); 
const PORT = 3000;

app.use(express.json());
app.use('/api/products', productRoutes);
app.use(express.urlencoded({ extended: true }));

//bilder public für das  Frontend 
const publicPath = path.join(__dirname, './public/');
app.use(express.static(publicPath));





const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


server.on('error', (error) => {
    console.error('Server error:', error);
});