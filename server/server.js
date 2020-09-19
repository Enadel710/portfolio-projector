var express = require("express");
var serveStatic = require("serve-static");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
// var scraper = require("webscraping.js");
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
  name VARCHAR(30),
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
    console.log(err);
  }
});


app.use(bodyParser.json({ extended: true }));

app.post("/fetchrequest", (req, res) => {
  // console.log("Got body: ", req.body);

  if (req.body.type === "addTicker") {
    db.run(`INSERT INTO Stocks VALUES(?, 3.8, 2.9, 'Apple', 12.52, 2.93, 3.41);`, [req.body.ticker], (err) => {
      if (err) {
        console.log(err.message);
        res.sendStatus(500);
      } else {
        console.log("Row was added to table successfully")
        res.sendStatus(200);
      }
    });
  }


  // db.all(`INSERT INTO Stocks IF NOT EXISTS VALUES ('AAPL', 3.8, 2.9, 'Apple', 12.52, 2.93, 3.41);`, [], function(error, tickers) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     res.send({data: tickers});
  //   }
  // });
  

  // if (req.body.type === "allTickers") {
  //   db.all(`SELECT ticker FROM Stocks`, [], (err, data))
  //   res.send(data)
  // }

  // res.send({
  //   hello: "Hello there"
  // });
});