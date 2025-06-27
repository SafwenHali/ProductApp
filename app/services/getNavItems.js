const axios = require('axios');

async function fetchItems(ref = '') {
  const reqBody = {
    request: {
      Reference: ref
    }
  };

  try {
    const response = await axios.post(process.env.GET_Items, reqBody);
    return response.data;
  } catch (err) {
    console.error('API error:', err.message);
    return err.message;
  }
}

exports.fetchNavItems = async () => {
  return await fetchItems('');
};

exports.fetchNavItems = async (ref) => {
  return await fetchItems(ref);
};

exports.getNavCategories = async () => {
  const data = await fetchItems('');
  if (!data?.GetItemsResult?.Items) return [];

  const categories = Array.from(
    new Set(data.GetItemsResult.Items.map(i => i["Catégorie"]))
  );
  return categories;
};

exports.getNavSubCategories = async (categoryName) => {
  const data = await fetchItems('');
  if (!data?.GetItemsResult?.Items) return [];

  const grouped = {};
  data.GetItemsResult.Items.forEach(item => {
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

  return categories[categoryName] || [];
};

exports.getMarques = async () => {
  const data = await fetchItems('');
  const marques = Array.from(new Set(data.GetItemsResult.Items.map(i => i["Marque"])));

  return marques
};