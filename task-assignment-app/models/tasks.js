const mongoose = require("mongoose");

const contentOfRowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: [contentOfRowSchema],
});

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: [contentSchema],
});

const ContentOfRow = mongoose.model("ContentOfRow", contentOfRowSchema);
const Row = mongoose.model("Row", contentSchema);
const Task = mongoose.model("Task", taskSchema);
module.exports = { Task, Row, ContentOfRow };
