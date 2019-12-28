const express = require('express');

const PORT = 8000;
const app = express();

const dataService = require('./dataService');

app.get('/', function(req, res) {
  res.send('');
});

app.get('/info', (req, res) => {
  var serverInfo = require('./package.json');
  res.json({serverName: serverInfo.name, serverVersion: serverInfo.version});
});

// Send products and categories together
app.get('/products/all', (req, res) => {
  var productMap = dataService.getCombinedProductMap();
  let all = Array.from(productMap.entries());
  res.json({all});
});

// Get values for which product ID is a key
app.get('/product/:id', (req, res) => {
  dataService.getProducts();
  var productById = global.productMap.get(req.params.id);
  res.json({productById});
});

// Get values for which category ID is a key
app.get('/category/:ctyId', (req, res) => {
  dataService.getCategories();
  var productsInCategory = global.categoryMap.get(req.params.ctyId);
  res.json({productsInCategory});
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
