const {handleSQL} = require('../utils/handleQuery')

exports.selectProducts = async () => {
  try {
   const data =  await handleSQL ("SELECT * FROM `ps_product`")
   if (data.length === 0) {
      return ({ status: 404, message: 'Products not found' });
    }
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};

exports.selectProductRefs = async () => {
  try {
   const data =  await handleSQL ("SELECT * FROM `ps_product`")
   if (data.length === 0) {
      return ({ status: 404, message: 'Products not found' });
     
    }
    const tab = data.map(product => ({
  id: product.id_product,
  ref: product.reference
}));
    return ({ status: 200, data: tab  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};

exports.selectProductByRef = async (ref) => {
  try {
   const data =  await handleSQL ("SELECT * FROM `ps_product` WHERE `ps_product`.`reference` = '" + ref + "' ;")
   if(data[0]===undefined)
    {return ({ status: 404, message: 'Products not found'  })}
    return ({ status: 200, data: data  });
  } catch (err) {
    console.error('server error:', err);
    return ({ status: 500, data: null  });
  }
};