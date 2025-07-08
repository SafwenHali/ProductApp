const {selectStockAvailable,selectStockByProductId,UpdateStockAvailable} = require('../../models/stockAvailable')

exports.getAllStock = async (req, res) => {
  try {
  const data = await selectStockAvailable()
    res.status(200).json(data);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};

exports.findStockIdByProductId = async (req, res) => {
  try {
    const data = await selectStockByProductId(req.body.id)
    res.status(200).json(data);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};

exports.updateStock = async (req, res) => {
  try {
  const data = await UpdateStockAvailable(req.body.quantity,req.body.stockId)
   res.status(201).json(data);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};


const {fetchNavItems} = require('../../services/getNavItems')
const {selectProductByRef} = require('../../models/product')


exports.changeStockToMatchNav = async (req, res) => {
  try {
    const navProduct = await fetchNavItems(req.body.ref)
    const quantity = navProduct.GetItemsResult.Items[0].Quantité
    const productId = await (await selectProductByRef(req.body.ref)).data[0].id_product
    const stockId = await (await selectStockByProductId(productId)).data[0].id_stock_available
    const data = await UpdateStockAvailable(quantity, stockId)
   res.status(200).json(data);
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};