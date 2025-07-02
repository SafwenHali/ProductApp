const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

async function fetchManufacturerDetails(marque) {

    const id = marque['@_id'];

    try {
      const response = await axios.get(
        process.env.GET_Marques+ '/'+ id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
        { headers: { 'Accept': 'application/xml' }, timeout: 10000 }
      );
       const parser = new XMLParser({
       ignoreAttributes: false,
       attributeNamePrefix: '@_'
     });
      const json = parser.parse(response.data);
      const name = json.prestashop.manufacturer.name;

      return { id: parseInt(id), name };

    } catch (err) {
      console.warn(`Failed to fetch manufacturer ${id}:`, err.message);
    }
}

exports.fetchMarques = async () => {
 try {
     const response = await axios.get(
       process.env.GET_Marques + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
       { headers: { 'Accept': 'application/xml' }, timeout: 10000  }
     );
     response
     // Configure to preserve attributes with '@_' prefix
     const parser = new XMLParser({
       ignoreAttributes: false,
       attributeNamePrefix: '@_'
     });
    const results = [];
    const parsed = parser.parse(response.data);
    const marques = parsed.prestashop.manufacturers.manufacturer;

    for (const marque of marques) {
    const data = await fetchManufacturerDetails(marque);
    results.push(data);
    }
    
    return results;
   } catch (err) {
     console.error('API error:', err.message);
     return [];
   }
 };