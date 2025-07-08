const {handleSQL} = require('../utils/handleQuery')

exports.selectStockAvailable = async () => {
  try {
   const data =  await handleSQL ("SELECT * FROM `ps_stock_available`")
   if (data.length === 0) {
      return ({ status: 404, message: 'Stock not found' });
    }
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};

exports.selectStockByProductId = async (id) => {
  try {
   const data =  await handleSQL ("SELECT `id_stock_available` FROM `ps_stock_available` WHERE id_product ="+id)
   if (data.length === 0) {
      return ({ status: 404, message: 'Stock not found' });
    }
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};

exports.UpdateStockAvailable = async (stock,stockId) => {
  try {
   const data =  await handleSQL ("UPDATE `ps_stock_available` SET `quantity` = "+stock + " WHERE `ps_stock_available`.`id_stock_available` = "+ stockId + ";")
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};

exports.getFinalStockByProductId = async (id) => {
  try {
    const data =  await handleSQL ("SELECT `id_stock_available` , `reserved_quantity` ,`quantity` FROM `ps_stock_available` WHERE id_product ="+id)
   if (data.length === 0) {
      return ({ status: 404, message: 'Stock not found' });
    }

    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};
