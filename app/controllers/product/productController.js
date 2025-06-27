const { fetchProducts, getProductByID } = require('../../services/getProducts');
const {postProductTemplate } = require('../../templates/postProductTemplate')

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
const axios = require('axios');
exports.createNewProduct = async (req, res) => {
  try {
    const result = postProductTemplate();
    axios.post(
  process.env.GET_Products + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
  result,
  {
    headers: {
      'Content-Type': 'application/xml',
      'Accept': 'application/xml'
    }
  }
).then(response => {
  console.log('Success:', response.data);
}).catch(error => {
  console.error('Error:', error.response?.status, error.response?.data || error.message);
});
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};