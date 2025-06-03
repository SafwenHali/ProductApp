const axios = require('axios');

exports.fetchNavItems = async () => {
  try {
    const response = await axios.post('https://fleurdorangeshop.tn/api/products?&ws_key=J9AC7R1W8PZQVFWALZNK4AQH11HUTHG4');
    const Items = response.data;
    return Items;
  } catch (err) {
    console.error('API error:', err.message);
    return (err.message);
  }
};

