const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Create the form and append the image
exports.image = async (props) => {
const IMAGE_PATH = './app/data/images/'+props.ref+'.jpg' ;

const form = new FormData();
form.append('image', fs.createReadStream(IMAGE_PATH));

// Axios config
axios.post( process.env.GET_Product_Images+ "/" + props.id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY, form, {
  headers: {
    ...form.getHeaders(), // Include correct content-type with boundary
    'Accept': 'application/xml'
  }
})
.then(response => {
  console.log('Image uploaded successfully');
  console.log(response.data); // Will include the new image ID
  return 1
})
.catch(error => {
  console.error(' Error uploading image:', error.response?.data || error.message);
  return 0
});


}