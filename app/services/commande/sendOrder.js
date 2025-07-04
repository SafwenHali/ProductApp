const axios = require('axios');

exports.sendOrder = async (cart, contact) => {
  try {
    const Tab = Array.isArray(cart.order_row) ? cart.order_row : [cart.order_row];

    const Lignes = Tab.map(i => ({
      Article: i.product_reference,
      Quantité: i.product_quantity
    }));

    const commande = {
      request: {
        Contact: contact,
        Méthode: "COD",
        Num: "",
        Lignes: Lignes
      }
    };

    const response = await axios.post(process.env.ADD_Order, commande);
    console.log('Success:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};