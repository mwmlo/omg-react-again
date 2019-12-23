const express = require("express");

const PORT = 8080;
const app = express();

app.get('/', function (req, res) {
    res.send(" ");
});

app.get("/info", (req, res) => {
    var serverInfo = require('./package.json');
    res.json({serverName : serverInfo.name, serverVersion : serverInfo.version});
});

app.listen(PORT, () => {
   console.log(`Server is listening on port: ${PORT}`);
});
   