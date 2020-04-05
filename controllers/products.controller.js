const Product = require('../models/product.model');

exports.loadAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) res.status(404).json({ product: 'Not Found' });
    else res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loadProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) res.status(404).json({ product: 'Not Found' });
    else res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};