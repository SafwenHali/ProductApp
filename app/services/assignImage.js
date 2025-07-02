const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

function normalizeRef(ref) {
  return String(ref).toLowerCase().replace(/[-_\s]/g, '');
}

// Supported image extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

exports.image = async (product) => {
  const IMAGE_DIR = './app/data/images';
  const files = fs.readdirSync(IMAGE_DIR);

  const normalizedProductRef = normalizeRef(product.reference);

  // Find the first matching file with allowed extensions
  const match = files.find(file => {
    const ext = path.extname(file).toLowerCase();
    const base = path.parse(file).name;
    return allowedExtensions.includes(ext) &&
           normalizeRef(base).startsWith(normalizedProductRef);
  });

  if (!match) {
    console.warn(`⚠️ No image found for product reference: ${product.reference}`);
    return 0;
  }

  const IMAGE_PATH = path.join(IMAGE_DIR, match);
  const form = new FormData();
  form.append('image', fs.createReadStream(IMAGE_PATH));

  try {
    const response = await axios.post(
      process.env.GET_Product_Images+ "/" + product.id + process.env.TUNIMATEC_PRESTASHOP_WS_KEY,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Accept': 'application/xml',
        },
      }
    );
    console.log(`✅ Image uploaded for ${product.reference} (${match})`);
    return 1;
  } catch (error) {
    console.error(`❌ Error uploading image for ${product.reference}:`, error.response?.data || error.message);
    return 0;
  }
};
