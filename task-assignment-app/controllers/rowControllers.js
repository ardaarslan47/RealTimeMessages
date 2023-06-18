const asyncHandler = require("express-async-handler");
const { Task, Row } = require("../models/tasks");

// create new row
const createRow = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rowTitle } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const newRow = new Row({ title: rowTitle });
    task.content.push(newRow);
    await task.save();

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// update row title
const updateRow = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId } = req.params;
    const { newTitle } = req.body;

    const updatedTask = await Task.updateOne(
      { _id: id, "content._id": rowId },
      { $set: { "content.$.title": newTitle } }
    );

    if (updatedTask.nModified === 0) {
      res.status(404);
      throw new Error("Row not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// delete row
const deleteRow = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, {
      $pull: { content: { _id: rowId } },
    });

    if (!updatedTask) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { createRow, updateRow, deleteRow };
