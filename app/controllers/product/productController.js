const { fetchProducts, getProductByID } = require('../../services/getProducts');

// by webservice

exports.getAllProductIDs = async (req, res) => {
  try {
    const result = await fetchProducts();

    return res.status(200).json(result);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
exports.getProductByID = async (req, res) => {
  try {
    const result = await getProductByID(req.params.id);
    return res.status(200).json(result);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// by db

const {selectProducts,selectProductRefs} = require("../../models/product")

exports.getProducts = async (req, res) => {
  try {
    const result = await selectProducts();

    return res.status(200).json(result);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductRefs = async (req, res) => {
  try {
    const result = await selectProductRefs();

    return res.status(200).json(result);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};