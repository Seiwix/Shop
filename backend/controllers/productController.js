const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel');

const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    let fileName;
    if (req.body.name) {
      const productName = req.body.name;
      const fileExtension = path.extname(file.originalname);
      fileName = `${productName}-${Date.now()}${fileExtension}`;
    } else {
      const fileExtension = path.extname(file.originalname);
      fileName = `product-${Date.now()}${fileExtension}`;
    }
    req.fileName = fileName;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage
});

async function addProduct(req, res) {
  const {
    name,
    description,
    price,
    stockQuantity
  } = req.body;
  console.log()
  const imageUrl = "http://localhost:3000/" + req.fileName; // Dateipfad des hochgeladenen bildes;
  try {
    const product = new Product(null, name, description, price, stockQuantity, imageUrl);
    const result = await product.save();
    res.status(201).json({
      message: result
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}
async function getProducts(req, res) {
  try {
    const products = await Product.getAll();
    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}
async function getProductById(req, res) {
  const id = req.params;
  console.log(req.params);
  try {
    const product = await Product.getById(id);
    res.status(200).json({
      product
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}
async function updateProduct(req, res) {

  const id = req.params;
  console.log(id);
  const product = await Product.getById(id);
  console.log(product)
  console.log(req.body);
  try {

    if (!product) {
      return res.status(404).json({
        error: 'Produkt nicht  gefunden'
      });
    }
    const {
      name,
      description,
      price,
      stockQuantity
    } = req.body;
    console.log(req.body);
    console.log(product);
    if (req.file) // nur prüfen ob ein neues Bild Hochgeladen wurde 
    {
      await deleteProductImage(product.imageUrl);
      const newImageUrl = "http://localhost:3000/" + req.file.filename;
      product.imageUrl = newImageUrl;


    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.stockQuantity = stockQuantity;
    await product.update(id);
    res.status(200).json({
      message: 'Produkt erfolgreich wurde   aktualisiert '
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function deleteProductImage(imgURL) {

  const imgName = imgURL.split('/').pop();

  const imgPath = `public/${imgName}`;


  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath);
    console.log("bild wurde gelöscht");
  } else {
    console.log("bild konnte nicht gelöscht werden");
  }
}

async function deleteProduct(req, res) {
  const id = req.params;
  console.log(req.params);
  try {
    const product = await Product.delete(id);
    res.status(200).json({
      product
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

module.exports = {
  upload: upload.single('imageUrl'),
  addProduct: addProduct,
  getProducts: getProducts,
  getProductById: getProductById,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
};