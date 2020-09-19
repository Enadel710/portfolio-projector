var express = require('express');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/../client/dist"));
var port = process.env.PORT || 8080;
var hostname = 'localhost';

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });