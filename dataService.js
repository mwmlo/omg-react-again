/* eslint-disable no-undef */
var product = require('./src/data/products.json');
var category = require('./src/data/categories.json');

let p = product.products;
let c = category.categories;

global.productMap = new Map();
global.categoryMap = new Map();
global.combinedProductMap = new Map();

// Assign product ID as key and all other product information as value in map
function getProducts() {
  for (food in p) {
    var foodInfo = [
      p[food].categoryId,
      p[food].name,
      p[food].unit,
      p[food].pricePerUnit,
      p[food].stocks];
    global.productMap.set(p[food].id, foodInfo);
  }
}

// Assign category ID as key and category name as value in map
function getCategories() {
  for (cty in c) {
    categoryMap.set(c[cty].id, c[cty].categoryName);
  }
}

// Assign products to the appropriate categories
function combineProductsWithCategories() {
  combinedProductMap.set(c[0], [p[0], p[1], p[2]]);
  combinedProductMap.set(c[1], [p[3], p[4], p[5]]);
  combinedProductMap.set(c[2], [p[6], p[7], p[8]]);
  combinedProductMap.set(c[3], [p[9], p[10], p[11]]);
}

// Ensure that products and categories are combined
function getCombinedProductMap() {
  if (combinedProductMap.size === 0) {
    combineProductsWithCategories();
  }
  return combinedProductMap;
}

// Enable index.js file to access functions
module.exports = { getProducts, getCategories, getCombinedProductMap };
