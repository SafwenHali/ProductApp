const { getNavCategories, getNavSubCategories } = require('../../services/getNavItems')

exports.getNavCategories = async (req, res) => {
  try {
    const categories = await getNavCategories();

   res.status(200).json({"categories" : categories});
 } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}

exports.getNavSubCategoriesByCategory = async (req, res) => {
  try {
    const subcategories = await getNavSubCategories(req.params.category)

  res.status(200).json(subcategories);

    
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}
