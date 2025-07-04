const axios = require('axios');
const {PostStatusChangeTemplate } = require('../../templates/PostStatusChangeTemplate')

exports.sendOrderStatus = async (id) => {
  const status = process.env.STATUS_Sent;

  try {
    const body = PostStatusChangeTemplate(id, status);

    const response = await axios.post(
      process.env.GET_Order_Histories + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
      body
    );

    console.log('Status Changed Successfully');
    return response.data;

  } catch (error) {
    console.error('Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};