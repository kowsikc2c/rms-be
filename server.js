const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
var mysql = require('mysql');
const connection = require("./app/models/db.js");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
