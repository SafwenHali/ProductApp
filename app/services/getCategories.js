const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

async function fetchCategoriesIDs () {
  try {
    const response = await axios.get(
      process.env.GET_Categories + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
      { headers: { 'Accept': 'application/xml' } }
    );

    // Configure to preserve attributes with '@_' prefix
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });

    const parsed = parser.parse(response.data);

    const categories = parsed.prestashop.categories.category;

    const categoryList = Array.isArray(categories) ? categories : [categories];

    const filteredIds = categoryList
      .map(cat => parseInt(cat['@_id'], 10))
      .filter(id => id !== 1 && id !== 2);
      return filteredIds;

  } catch (err) {
    console.error('API error:', err.message);
    return [];
  }
};
 const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  ignoreDeclaration: true,
  cdataPropName: "#text"
});

function extractText(languageEntry) {
  if (typeof languageEntry['#text'] === 'string') return languageEntry['#text'];
  if (Array.isArray(languageEntry['#text']) && languageEntry['#text'][0])
    return languageEntry['#text'][0]['#text'] ?? '';
  return '';
}

async function fetchCategories(Tab) {
  const results = [];

  for (const id of Tab) {
    
    try {
      const response = await axios.get(
        process.env.GET_Categories + "/" + id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
        { headers: { 'Accept': 'application/xml' } }
      );

      const json = parser.parse(response.data);
      const parentId = json.prestashop.category.id_parent['#text'][0]['#text'];
      
      if (parentId === '2') {
        const name = extractText(json.prestashop.category.name.language[1]);
        
        results.push({ id, name });
      }

    } catch (err) {
      console.error(`Error fetching category ${id}:`, err.message);
    }
  }

  return results;
}

exports.fetchSubCategories = async (parentId) => {
 const results = [];

  try {
    // Step 1: Get category references
    const listResponse = await axios.get(
      process.env.GET_Categories + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
      { headers: { 'Accept': 'application/xml' },
          timeout: 10000 }
    );

    const listJson = parser.parse(listResponse.data);
    const categoryRefs = listJson.prestashop.categories.category;

    const categories = Array.isArray(categoryRefs) ? categoryRefs : [categoryRefs];

    // Step 2: Loop through each category
    for (const ref of categories) {
      const id = ref['@_id'];

      try {
        const catResponse = await axios.get(
          process.env.GET_Categories +'/'+ id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
          { headers: { 'Accept': 'application/xml' },
          timeout: 10000  }
        );

        const catJson = parser.parse(catResponse.data);
        const category = catJson.prestashop.category;

        // 🔧 Fix deeply nested parent ID
        const categoryParentId = category.id_parent?.['#text']?.[0]?.['#text'];
        const categoryName = category.name?.language?.[1] || category.name?.language || '';
        if (parseInt(categoryParentId) === parentId) {
          results.push({ id: parseInt(id), name: categoryName?.['#text']?.[0]?.['#text'] });
        }
      } catch (catErr) {
        console.warn(`Failed to fetch category ${id}:`, catErr.message);
      }
    }

  } catch (err) {
    console.error(`Error fetching category list:`, err.message);
  }

  return results;
}


exports.fetchCategoriesIDs = async () => {
     return await fetchCategoriesIDs('');
}
exports.fetchCategories = async () => {
     const Tab = await fetchCategoriesIDs('');
     const res = await fetchCategories (Tab);
     return res
}