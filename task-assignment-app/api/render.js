const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Path to your UI directory

app.get("/", (req, res) => {
  res.render("index"); // Render your EJS template, e.g., index.ejs
});

module.exports = app;
