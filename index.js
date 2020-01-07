const express = require("express");

const PORT = 8080;
const app = express();

var product = require('./src/data/products.json');
var category = require('./src/data/categories.json');

app.get('/', function (req, res) {
    res.send(" ");
});

app.get("/info", (req, res) => {
    var serverInfo = require('./package.json');
    res.json({serverName : serverInfo.name, serverVersion : serverInfo.version});
});

app.get("/products/all", (req, res) => {

    // STEP 4. Combine category and product details, then send as JSON.

    var combined = Object.assign({}, category, product);
    res.json({allProducts : combined});
});

app.get("/product/:id", (req,res) => {

    // STEP 5. Loop through products. If id matches, send product details as JSON.

    for (food in product.products) {
        if (product.products[food].id == req.params.id) {
            var productById = product.products[food];
        };
    };
    res.json({productById});
});

app.get("/category/:ctyId", (req,res) => {

    // STEP 6. Loop through products. If categoryId matches, add product to array. Send array as JSON.

    var productsInCategory = [];
    for (food in product.products) {
        if (product.products[food].categoryId == req.params.ctyId) {
            productsInCategory.push(product.products[food]);
        };
    };
    res.json({productsInCategory});
});


app.listen(PORT, () => {
   console.log(`Server is listening on port: ${PORT}`);
});
   