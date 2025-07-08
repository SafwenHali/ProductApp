const {selectStockByProductId,UpdateStockAvailable} = require('../../models/stockAvailable')
const {fetchNavItems} = require('../../services/getNavItems')
const {selectProductByRef} = require('../../models/product')


exports.quantityDataScript = async (req, res) => {
  try {
    const navProducts = await fetchNavItems()
    const List = navProducts.GetItemsResult.Items
    for (const navProduct of List) {
    const quantity = navProduct.Quantité
    const productId = await (await selectProductByRef(navProduct.Référence)).data[0].id_product
    const stockId = await (await selectStockByProductId(productId)).data[0].id_stock_available
    const data = await UpdateStockAvailable(quantity, stockId)
      console.log(data.status)
  }
   res.status(200).json("attempted to add quantities of all products");
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};

