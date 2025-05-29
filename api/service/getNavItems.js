const axios = require('axios');

exports.fetchNavItems = async () => {
  try {
    const reqBody = {
      request: {
        Reference: ''
      }
    };
    const response = await axios.post(process.env.GET_Items, reqBody);
    const Items = response.data;
    return Items;
  } catch (err) {
    console.error('API error:', err.message);
    return (err.message);
  }
};
exports.fetchNavItems = async (ref) => {
  try {
    const reqBody = {
      request: {
        Reference: ref
      }
    };
    const response = await axios.post(process.env.GET_Items, reqBody);
    const Items = response.data;
    return Items;
  } catch (err) {
    console.error('API error:', err.message);
    return (err.message);
  }
};