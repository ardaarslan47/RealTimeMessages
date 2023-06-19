const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const connectDb = require("./config/dbConnetction");

connectDb();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./api/userRoutes"));
app.use("/api/tasks", require("./api/taskRoutes"));

app.use(errorHandler);

module.exports = app;