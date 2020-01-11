// Maps.
let productMap;
let categoryMap;
let combinedProductMap;

// Assign product ID as key and all other product information as value in map.
function getProducts() {

  // If productMap is not empty, return productMap.
  if (productMap) {
    return productMap;
  }

  // Otherwise, load the JSONs and create the map.
  const productsData = require('./src/data/products.json');
  const productMapForReturn = new Map();

  productsData.products.forEach(product => {
    productMapForReturn.set(product.id, product);
  });

  productMap = productMapForReturn;
  return productMap;

}

// Assign category ID as key and category name as value in map.
function getCategories() {

  // If categoryMap is not empty, return categoryMap.
  if (categoryMap) {
    return categoryMap;
  }

  // Otherwise, load the JSONs and create the map.
  const categoriesData = require('./src/data/categories.json');
  const categoryMapForReturn = new Map();

  categoriesData.categories.forEach(category => {
    categoryMapForReturn.set(category.id, category.categoryName);
  });

  categoryMap = categoryMapForReturn;
  return categoryMap;

}

// Add categoryName to each product in productMap. Return combined map.
function combineProductsWithCategories() {

  const combinedMapToReturn = new Map();

  // Create productMap and categoryMap using functions above.
  getProducts();
  getCategories();

  // Get the values of the productMap.
  const productsInMap = productMap.values();

  // When the category IDs match, add categoryName to productMap values.
  for (let product of productsInMap) {
    product.categoryName = categoryMap.get(product.categoryId);
    combinedMapToReturn.set(product.id, product);
  };

  combinedProductMap = combinedMapToReturn;

}

// Ensure that products and categories are combined.
function getCombinedProductMap() {
  if (!combinedProductMap) {
    combineProductsWithCategories();
  }
  return combinedProductMap;
}

// Enable index.js file to access function for maps.
module.exports = {getCombinedProductMap};
