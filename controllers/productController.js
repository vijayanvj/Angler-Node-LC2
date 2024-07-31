
const Product = require('../models/Product');


const createProduct = async (req, res) => {
  try {
    const { name, price, count } = req.body;
    const image = req.file.path;
    const product = new Product({ name, price, count, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error getting products', error });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, count } = req.body;
    const image = req.file ? req.file.path : undefined;
    const updatedData = { name, price, count };
    if (image) updatedData.image = image;
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
