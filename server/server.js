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

const db = new sqlite3.Database(DB_PATH, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Connected to ' + DB_PATH + ' database.')
});

var dbSchema = `CREATE TABLE IF NOT EXISTS Stocks (
  ticker VARCHAR(5) PRIMARY KEY,
  avg_cost DECIMAL(10,2),
  quantity DECIMAL(10,5),
  name VARCHAR(30) UNIQUE,
  curr_cost DECIMAL(10,5),
  avg_one_year DECIMAL(10,5),
  avg_five_year DECIMAL(10,5)
);

  CREATE TABLE IF NOT EXISTS Totals (
  day DATE PRIMARY KEY,
  curr_val_of_portfolio DECIMAL(12,5),
  profit_loss DECIMAL(10,5)
);`

db.exec(dbSchema, function(err){
  if (err) {
    console.logg(err);
  }
});
