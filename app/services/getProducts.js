const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

exports.fetchProducts = async () => {
  try {
    const response = await axios.get(process.env.GET_Products + process.env.TUNIMATEC_PRESTASHOP_WS_KEY );
    const Items = response.data;

    if (!Items) {
      console.error  ({status: 404 , message: 'No result fetching products' });
      return 0;
    }

    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const products = json?.prestashop?.products?.product;

    if (!products) {
      console.error ({ message: 'No products found in parsed XML' });
      return 0;
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

exports.getProductByID = async (id) => {
  try {
    const response = await axios.get(process.env.GET_Products + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const products = json?.prestashop?.product;
    
     if (!products) {
      return { status: 404, message: 'Product not found' };
    }

    return products

  } catch (err) {
    return { status: 400, message: err.message };
  }
};

