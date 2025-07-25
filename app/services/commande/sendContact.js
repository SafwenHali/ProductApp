const axios = require('axios');
const {  getAdressByID } = require('../getAdress')
const { getCustomerByID } = require('../getCustomer')

exports.sendConstact = async (clientID, adressID) => {
  try {
    const adress = await getAdressByID(adressID);
    const customer = await getCustomerByID(clientID);

    const contact = {
      request: {
        Nom: customer.Nom,
        Prénom: customer.Prénom,
        Email: customer.Email,
        Adresse: adress.Adresse,
        Téléphone: adress.Téléphone,
        Cité: adress.Cité,
        Sexe: customer.Sexe
      }
    };

    const response = await axios.post(process.env.ADD_Contact, contact);
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    //console.error('Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};