const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Task = require("./models/tasks");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/taskApp");
  console.log("Connected to mongoose");
}

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.render("index", { tasks });
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.redirect(`/tasks/${newTask._id}`);
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.find({});
  const task = await Task.findById(id);
  res.render("show", { task, tasks });
});

app.put('/tasks/:id', async (req, res) => {
  const {id} = req.params
  await Task.findByIdAndUpdate(id, {$set: {title: req.body.title}})
  res.redirect(`/tasks/${id}`)
})

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/tasks");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
