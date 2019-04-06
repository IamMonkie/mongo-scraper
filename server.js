//Dependencies
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const router = express.Router();
//Server/ DB ------------------------------------
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

//-----------------------------------------------

// set public folder as static dir
app.use(express.static(__dirname + "/public"));

//-----------------------------------------------

//router
require("./config/routes")(router);
//-----------------------------------------------

// handlebars
//connect handlebars to express app
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//-----------------------------------------------

//bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//request go through middleware router
app.use(router);

//-----------------------------------------------

//Database

//if deployed, use the deployed database, otherwise use local climbingHeadlines database
let db = process.env.MONGODB_URI || "mongodb://localhost/climbingHeadlines";

//connect mongoose to database
mongoose.connect(db, error => {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Mongoose connection successful");
  }
});

//-----------------------------------------------

//Server
//Listen to port
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
