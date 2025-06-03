const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

exports.fetchProducts = async () => {
  try {
    const response = await axios.get(process.env.GET_Products + process.env.TUNIMATEC_PRESTASHOP_WS_KEY );
    const Items = response.data;

    if (!Items) {
      return res.status(404).json({ message: 'No result fetching products' });
    }

    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const products = json?.prestashop?.products?.product;

    if (!products) {
      return res.status(404).json({ message: 'No products found in parsed XML' });
    }

    const productList = Array.isArray(products) ? products : [products];

    const result = productList.map(p => ({
      id: p['@_id']
    }));

    return result;
  } catch (err) {
    console.error('API error:', err.message);
    return 0;
  }
};

