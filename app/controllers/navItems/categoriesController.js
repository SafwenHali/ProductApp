const { fetchNavItems } = require('../../services/getNavItems')

exports.getNavCategories = async (req, res) => {
  try {
    const result = await fetchNavItems();
    const categories = Array.from(new Set(result.GetItemsResult.Items.map(i => i["Catégorie"])));

   res.status(200).json({"categories" : categories});
 } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}

exports.getNavSubCategories = async (req, res) => {
  try {
    const result = await fetchNavItems();

    const grouped = {};
    result.GetItemsResult.Items.forEach(item => {
        const category = item["Catégorie"];
        const subCategory = item["Sous_Catégorie"];
        if (!grouped[category]) {
            grouped[category] = new Set();
        }
        grouped[category].add(subCategory);
    });

    const categories = {};
    for (const [cat, subCats] of Object.entries(grouped)) {
        categories[cat] = Array.from(subCats);
    }

    res.status(200).json({"Categories" : categories})
    
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}

exports.getNavSubCategoriesByCategory = async (req, res) => {
  try {
    const result = await fetchNavItems();
    const grouped = {};
    result.GetItemsResult.Items.forEach(item => {
        const category = item["Catégorie"];
        const subCategory = item["Sous_Catégorie"];
        if (!grouped[category]) {
            grouped[category] = new Set();
        }
        grouped[category].add(subCategory);
    });

    const categories = {};
    for (const [cat, subCats] of Object.entries(grouped)) {
        categories[cat] = Array.from(subCats);
    }

    const categoryName = req.params.category;

  const subcategories = categories[categoryName];

  if (!subcategories) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(subcategories);

    
  } catch (err) {
    console.error('server error:', err);
    res.status(500).json({ message: 'server error' });
  };
}
