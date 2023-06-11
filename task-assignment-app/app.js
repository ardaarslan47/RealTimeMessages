const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const { Task, Row, ContentOfRow } = require("./models/tasks");

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

// show index
app.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.render("index", { tasks });
});

// create task
app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.redirect(`/tasks/${newTask._id}`);
});

// show single task
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.find({});
  const task = await Task.findById(id);
  res.render("show", { task, tasks });
});

// update task title
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, { $set: { title: req.body.title } });
  res.redirect(`/tasks/${id}`);
});

// delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/");
});

// create new row
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { rowTitle } = req.body;
  await Task.findByIdAndUpdate(id, {
    $push: { content: new Row({ title: rowTitle }) },
  });
  res.redirect(`/tasks/${id}`);
});

// update row title
app.put("/tasks/:id/:rowId", async (req, res) => {
  const { id, rowId } = req.params;
  const { newTitle } = req.body;
  await Task.updateOne(
    { _id: id, "content._id": rowId },
    { $set: { "content.$.title": newTitle } }
  );
  res.redirect(`/tasks/${id}`);
});

// delete row
app.delete("/tasks/:id/:rowId", async (req, res) => {
  const { id, rowId } = req.params;
  await Task.findByIdAndUpdate(id, { $pull: { content: { _id: rowId } } });
  res.redirect(`/tasks/${id}`);
});

// create content of row
app.patch("/tasks/:id/:rowId", async (req, res) => {
  const { id, rowId } = req.params;
  const { contentTitle, contentDescription } = req.body;
  const newContent = new ContentOfRow({title: contentTitle, description: contentDescription})
  await Task.updateOne(
    { _id: id, "content._id": rowId },
    {$push: {"content.$.content": newContent}}
  )
  res.redirect(`/tasks/${id}`);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
