const { fetchProducts } = require('../../services/getProducts');


exports.getAllProductIDs = async (req, res) => {
  try {
    const result = await fetchProducts();

    return res.status(200).json(result);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
