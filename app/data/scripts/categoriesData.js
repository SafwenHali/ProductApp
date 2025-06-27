const {postCategoryTemplate } = require('../../templates/postCategoryTemplate')
const {getNavCategories, getNavSubCategories} = require('../../services/getNavItems')
const {fetchCategories} = require('../../services/getCategories')

const axios = require('axios');

exports.addCategories = async (req, res) => {
  try { 
    const categories = await getNavCategories()
    categories.forEach((i)=> {
        const category = {name : i}
        const body = postCategoryTemplate(category)
            axios.post(
          process.env.GET_Categories + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
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

exports.addSubCategories = async (req, res) => {
  try { 
    const Categories = await fetchCategories()
    Categories.forEach( async (category) => {
      const subcategories = await getNavSubCategories(category.name)
      subcategories.forEach ((subcategory)=>{
        const req = {name:subcategory, parent:category.id }
        const body = postCategoryTemplate(req)
          axios.post(
          process.env.GET_Categories + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
          body,
          {
            headers: {
              'Content-Type': 'application/xml',
              'Accept': 'application/xml'
            }
          }
        ).then(response => {
          console.log('Success:', response.data);})
      })
    })
   return res.status(200).json({ message: 'Subcategories added' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};