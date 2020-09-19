var express = require("express");
var serveStatic = require("serve-static");
const sqlite3 = require("sqlite3").verbose();
const DB_PATH = './tmp/database.db';

app = express();
app.use(serveStatic(__dirname + "/../client/dist"));
var port = process.env.PORT || 8080;
var hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const db = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
});