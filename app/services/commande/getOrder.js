const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

exports.fetchOrders = async () => {
  try {
    const response = await axios.get(process.env.GET_Orders + process.env.TUNIMATEC_PRESTASHOP_WS_KEY );
    const Items = response.data;

    if (!Items) {
      console.error  ({status: 404 , message: 'No result fetching orders' });
      return 0;
    }

    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);


    const orders = json?.prestashop?.orders.order;

    if (!orders) {
      console.error ({ message: 'No orders found in parsed XML' });
      return 0;
    }

    const orderList = Array.isArray(orders) ? orders : [orders];

    const result = orderList.map(p => ({
      id: p['@_id']
    }));

    return result;
  } catch (err) {
    console.error('API error:', err.message);
    return 0;
  }
};

exports.fetchOrdersWaiting = async () => {
  try {
    const response = await axios.get(process.env.GET_Orders + process.env.TUNIMATEC_PRESTASHOP_WS_KEY );
    const Items = response.data;

    if (!Items) {
      console.error  ({status: 404 , message: 'No result fetching orders' });
      return 0;
    }

    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);


    const orders = json?.prestashop?.orders.order;

    if (!orders) {
      console.error ({ message: 'No orders found in parsed XML' });
      return 0;
    }

    const orderList = Array.isArray(orders) ? orders : [orders];
    const list =[]
    
    for (const i of orderList) {
      const id = i['@_id']
       const res = await getOrderStatus(id)
       if (res == process.env.STATUS_Waiting)
       list.push({id : id, status : res});
       
    }
    return list;
  } catch (err) {
    console.error('API error:', err.message);
    return 0;
  }
};

async function getOrderStatus (id) {
   try {
    const response = await axios.get(process.env.GET_Orders + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const order = json?.prestashop?.order;
    
     if (!order) {
      console.log("no order found")
      return 0;
    }
    const state =order.current_state['#text']
   
    return state

  } catch (err) {
    return 0;
  }
};

exports.getorderByID = async (id) => {
  try {
    const response = await axios.get(process.env.GET_Orders + '/' + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY);
    const Items = response.data;
    
    const parser = new XMLParser({ ignoreAttributes: false });

    const json = parser.parse(Items);

    const order = json?.prestashop?.order;
    
     if (!order) {
      return { status: 404, message: 'order not found' };
    }
   const commande = {
    id : id ,
    adressID : order.id_address_invoice['#text'],
    clientID : order.id_customer['#text'],
    cart : order.associations.order_rows
   }
   
    return commande

  } catch (err) {
    return { status: 400, message: err.message };
  }
};