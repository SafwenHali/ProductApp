const {updateChangedProducts,addMissingProducts} = require('../services/getProducts')

async function newProductsSync() {
   try {
    const result = await addMissingProducts();
    console.log("New Product Sync completed.");
    if (result === 0 ){
      throw new Error("failed to add new Products");
    }
    return 1
  } catch (err) {
    console.error("New Product Sync failed:", err.message);
    return 0
  }
}

async function existingProductsSync() {
   try {
    const result = await updateChangedProducts();
    console.log("Existing Products Sync completed.");
    if (result === 0 ){
      throw new Error("failed to update Products");
    }
    return 1
  } catch (err) {
    console.error("Existing Products Sync failed:", err.message);
    return 0
  }
}

module.exports = async function productSync() {
   try {
    //await newProductsSync()
    await existingProductsSync()
    console.log("Product Sync completed.");
    return 1
  } catch (err) {
    console.error("Product Sync failed:", err.message);
    return 0
  }
};