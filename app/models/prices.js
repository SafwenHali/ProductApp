const {handleSQL} = require('../utils/handleQuery')
const {fetchNavItems} = require('../services/getNavItems')

exports.updatePrices = async (id,ref) => {
  try {

    const product =  await fetchNavItems(ref);
    const price = product.GetItemsResult.Items[0].Prix_Vente;
    const salePrice = product.GetItemsResult.Items[0].Prix_Promotionnel;
    const data0 = await handleSQL('UPDATE `ps_product` SET `price` = "'+price+'", `wholesale_price` = "'+salePrice+'" WHERE `ps_product`.`id_product` = "'+id+'";')
   const data = await handleSQL('UPDATE `ps_product_shop` SET `price` = "'+salePrice+'", `wholesale_price` = "'+salePrice+'" WHERE `ps_product_shop`.`id_product` = "'+id+'" ');
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};