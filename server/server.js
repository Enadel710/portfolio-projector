var express = require("express");
var serveStatic = require("serve-static");
const sqlite = require("sqlite")
app = express();
app.use(serveStatic(__dirname + "/../client/dist"));
var port = process.env.PORT || 8080;
var hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


(async () => {
  // open the database
  const db = await sqlite.open({
    filename: "/tmp/database.db",
    driver: sqlite.Database,
  });
})().then(function(value) {
    console.log("Async works!", value);
}).catch(function(err) {
    console.log("Error!", err)
});