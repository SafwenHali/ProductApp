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

async function getProductByID (id) {
   try {
   const response = await axios.get(process.env.GET_Products + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const product = json?.prestashop?.product;

    return product

  } catch (err) {
    return 0;
  }
};

exports.getProductByID = async (id) => {
  try {

    const product = await getProductByID(id)
    if (!product) {
      return { status: 404, message: 'Product not found' };
    }
    return { status: 200, data: product  }
  } catch (err) {
    return { status: 400, message: err.message };
  }
};


const {fetchNavItems} = require('../services/getNavItems')
const {fetchCategories,fetchSubCategories} = require('../services/getCategories')
const {fetchMarques} = require('../services/getMarques')
const {selectProductByRef} = require('../models/product')
const {postProductTemplate } = require('../templates/postProductTemplate')

exports.addMissingProducts = async () => {
  try {
    const data = await fetchNavItems()
    const categories = await fetchCategories();
    const marques = await fetchMarques();
    for(const i of data.GetItemsResult.Items)
    {
      const prod = await selectProductByRef(i.Référence)
      if (prod.status===404) {
        try{
          const category = categories.find(item => item.name === i.Catégorie)?.id;
        const subcategories = await fetchSubCategories(category);
        const subcategory = subcategories.find(item => item.name === i.Sous_Catégorie)?.id;
        const marque = marques.find(item => item.name === i.Marque)?.id;
        const product = {
          reference: i.Référence,
          name: i.Name,
          price: i.Prix_Vente,
          saleprice: i.Prix_Promotionnel,
          category: category,
          subcategory: subcategory,
          id_manufacturer: marque
        };
        const body = postProductTemplate(product);
        try {
                const response = await axios.post(
                  process.env.GET_Products + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
                  body,
                  {
                    headers: {
                      'Content-Type': 'application/xml',
                      'Accept': 'application/xml'
                    }
                  }
                );
                console.log('Attempted to add :',i.Référence);
              } catch (error) {
                console.error('Error:', error.response?.status, error.response?.data || error.message);
              }   
        } catch (err) {
          console.error('error adding Product :', err.message);
        }
      }
    }
    return data;
  } catch (err) {
    console.error('Add Missing Products error:', err.message);
    return 0;
  }
};

const {getFinalStockByProductId,UpdateStockAvailable,selectStockByProductId} = require('../models/stockAvailable')
const {updatePrices} = require('../models/prices')

exports.updateChangedProducts = async () => {
   try {
    console.log ("Attempting to update products  ... ")
    const data = await fetchNavItems()
    for(const i of data.GetItemsResult.Items)
    {
      let prod = await selectProductByRef(i.Référence)
      const stockReserve = await getFinalStockByProductId(prod.data[0].id_product)

      const available = stockReserve.data[0].quantity;
      const reserved = stockReserve.data[0].reserved_quantity
      const total =  available + reserved

      let stock = 0
      if(i.Quantité>0){
        stock = i.Quantité
      };

      const stockMatch = Math.abs(stock - available) < Number.EPSILON;

      if(!stockMatch) 
        { 
          console.log(i.Référence + " : stock doesn't Match") ;
          const stockId = await selectStockByProductId (prod.data[0].id_product);
          const update = await UpdateStockAvailable(stock ,stockId.data[0].id_stock_available);
          console.log("Attempted to update stock  for : "+ i.Référence);
        }

      const priceMatch = Math.abs(i.Prix_Vente - prod.data[0].price) < Number.EPSILON;
      if(!priceMatch) 
        { 
          console.log(i.Référence + " : Price doesn't Match"); 
          const update = await updatePrices(prod.data[0].id_product,i.Référence);
          prod = await selectProductByRef(i.Référence);
          console.log("Attempted to update prices  for : "+ i.Référence);
        }

      const salePriceMatch = Math.abs(i.Prix_Promotionnel - prod.data[0].wholesale_price) < Number.EPSILON;
      if(!salePriceMatch) 
        { 
          console.log(i.Référence + " : salePrice doesn't Match");
          const update = await updatePrices(prod.data[0].id_product,i.Référence);
          prod = await selectProductByRef(i.Référence) ;
          console.log("Attempted to update prices  for : "+ i.Référence);
        }
      
   }
    console.log ("Done.")
    return 1;
  } catch (err) {
    console.error('error:', err.message);
    return 0;
  }
};

