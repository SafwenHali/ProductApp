const axios = require('axios');
const { fetchOrders, getorderByID } = require('../../services/commande/getOrder');
const {  sendConstact } = require("../../services/commande/sendContact")
const {  sendOrder } = require("../../services/commande/sendOrder")

exports.sendOrders = async (req, res) => {
  try {
    const orders = await fetchOrders();
    for (const i of orders) {
      const order = await getorderByID(i.id);
      const contact = await sendConstact(order.clientID,order.adressID);
      if (!contact) {
        console.log("failed to add contact of order : "+ i.id)
      } else 
      {
        const commande = await sendOrder(order.cart,contact);
        if (!commande) {
        console.log("failed to add commande : "+ i.id)
      }
      }
    }
   res.status(200).json("attempted to send orders");
 } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}
/*


*/