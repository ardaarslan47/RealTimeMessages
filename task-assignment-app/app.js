const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const connectDb = require("./config/dbConnetction");

connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("", require("./routes/userRoutes"));
app.use("", require("./routes/taskRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
