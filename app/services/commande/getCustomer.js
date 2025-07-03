const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

   exports.getCustomerByID = async (id) => {
  try {
    const response = await axios.get(process.env.GET_Customers + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const customer = json?.prestashop?.customer;
     if (!customer) {
      return { status: 404, message: 'order not found' };
    }

    const sexe = customer.id_gender == 1 ? "Homme" : "Femme";
   
   const result = {
        Nom:customer.lastname,
        Prénom:customer.firstname,
        Email:customer.email,
        Sexe:sexe
    } ;
    return result

  } catch (err) {
    return { status: 400, message: err.message };
  }
};