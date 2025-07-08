const axios = require('axios');
const { fetchOrdersWaiting, getorderByID } = require('../../services/getOrder');
const {  sendConstact } = require("../../services/commande/sendContact")
const {  sendOrder } = require("../../services/commande/sendOrder")
const { sendOrderStatus } = require("../../services/commande/changeOrderStatus")


exports.sendOrders = async (req, res) => {
  try {
    const orders = await fetchOrdersWaiting();
    for (const i of orders) {
      const order = await getorderByID(i.id);
      const contactResponse = await sendConstact(order.clientID, order.adressID);
      if (
        !contactResponse || 
        contactResponse.AddOrModifyContactResult?.Status !== "200"
      ) {
        console.log("failed to add contact of order: " + i.id);
        continue;
      }
      const commande = await sendOrder(order.cart, contactResponse.AddOrModifyContactResult?.Result);
      if (!commande) {
        console.log("failed to add commande: " + i.id);
        continue;
      }
      const status = await sendOrderStatus(i.id);
      if (!status) {
        console.log("failed to change status of order: " + i.id);
      }
    }
    res.status(201).json("attempted to send orders");
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  }
};
