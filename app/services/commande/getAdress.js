const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

   exports.getAdressByID = async (id) => {
  try {
    const response = await axios.get(process.env.GET_Adresses + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const address = json?.prestashop?.address;
    
     if (!address) {
      return { status: 404, message: 'order not found' };
    }
   
   const result = {
        Adresse : address.address1,
        Téléphone : address.phone,
        Cité :address.city,
    } ;

    return result

  } catch (err) {
    return { status: 400, message: err.message };
  }
};
