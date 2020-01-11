const express = require('express');

const PORT = 8000;
const app = express();

// Import method to get productMap, categoryMap from dataService.js file.
const dataService = require('./dataService');

// Create a route for app.
app.get('/', function(req, res) {
  res.send('');
});

// Display server information.
app.get('/info', (req, res) => {
  const serverInfo = require('./package.json');
  res.json({serverName: serverInfo.name, serverVersion: serverInfo.version});
});

// Send products and categories combined.
app.get('/products/all', (req, res) => {
  const combinedDataMap = dataService.getCombinedProductMap();
  // Convert map into JSON object for output.
  const combinedData = Object.fromEntries(combinedDataMap);
  res.json({combinedData});
});

// Get values for which product ID is a key.
app.get('/product/:id', (req, res) => {
  const combinedDataMap = dataService.getCombinedProductMap();
  const productById = combinedDataMap.get(req.params.id);

  // Safety check for if ID entered is valid.
  if (!productById) {
    res.status(500).json({error: 'Invalid product ID'});
    return;
  }

  // Otherwise, return product by ID.
  res.json({productById});

});

// Get values for which category ID is a key.
app.get('/category/:ctyId', (req, res) => {
  const combinedDataValues = dataService.getCombinedProductMap().values();
  const categoryById = [];

  // If a product's category ID matches the request, add it to the array.
  for (let product of combinedDataValues) {
    if (req.params.ctyId === product.categoryId) {
      categoryById.push(product);
    }
  }

  // Check if category ID entered is valid (i.e. has placed products in array).
  if (categoryById.length === 0) {
    res.status(500).json({error: 'Invalid category ID'});
    return;
  }

  // Otherwise, return category by ID.
  res.json({categoryById});

});

// Listen to requests.
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
