const axios = require('axios');
const {getMarques} = require('../../services/getNavItems')
const {postMarqueTemplate } = require('../../templates/postMarquesTemplate')
exports.addMarques = async (req, res) => {
  try { 
    const marques = await getMarques()
    marques.forEach((i)=> {
        const body = postMarqueTemplate(i)
            axios.post(
          process.env.GET_Marques + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
          body,
          {
            headers: {
              'Content-Type': 'application/xml',
              'Accept': 'application/xml'
            }
          }
        ).then(response => {
          console.log('Success:', response.data);
          return res.status(200)
        }).catch(error => {
          console.error('Error:', error.response?.status, error.response?.data || error.message);
          return res.status(400)
        });
    });;
   
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};