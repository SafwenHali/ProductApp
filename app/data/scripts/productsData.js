const axios = require('axios');
const {fetchNavItems} = require('../../services/getNavItems')
const {fetchCategories,fetchSubCategories} = require('../../services/getCategories')
const {fetchMarques} = require('../../services/getMarques')
const {postProductTemplate } = require('../../templates/postProductTemplate')

exports.addProducts = async (req, res) => {
  try {
    const items = await fetchNavItems();
    const categories = await fetchCategories();
    const marques = await fetchMarques();

    const limitedItems = items.GetItemsResult.Items; // .slice(0, 1)

    for (const i of limitedItems) {
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
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error.response?.status, error.response?.data || error.message);
      }
    }

    return res.status(200).json({ message: 'Attempted to add products' });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const {getProductByID,fetchProducts} = require('../../services/getProducts')
const {image} = require('../../services/assignImage')

exports.addImagesToProducts =async (req ,res) => {
 try {
  const IDs = await fetchProducts()
  for (const i of IDs) {
    const p = await getProductByID(i.id);
    const f = image(p)
    console.log(f)
  }
  return res.status(200).json("success");
 } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};