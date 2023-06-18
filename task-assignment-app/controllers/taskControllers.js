const asyncHandler = require("express-async-handler");
const { Task } = require("../models/tasks");

const getIndex = asyncHandler(async (req, res, next) => {
  try {
    if (req.cookies.hasOwnProperty("error")) {
      const message = req.cookies.error;
      const tasks = await Task.find({ user_id: req.user.id });
      res.clearCookie("error"); // Clear the 'error' cookie after retrieving its value
      return res
        .status(200)
        .render("index", { message, tasks, user: req.user.userName });
    }
    const tasks = await Task.find({ user_id: req.user.id });
    res.status(200).render("index", { tasks, user: req.user.userName });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// create task
const createTask = asyncHandler(async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Please provide a title for the task");
    }
    const newTask = new Task({ title, user_id: req.user.id });
    await newTask.save();
    res.redirect(`/tasks/${newTask._id}`);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create a new task");
  }
});

// show single task
const showSingleTask = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id });
    if (req.cookies.hasOwnProperty("error")) {
      const message = req.cookies.error;
      res.clearCookie("error"); // Clear the 'error' cookie after retrieving its value
      return res
        .status(200)
        .render("show", { message, tasks, user: req.user.userName });
    }

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.render("show", { task, tasks, user: req.user.userName });
  } catch (error) {
    res.status(error.status || 500);
    console.log(error);
    throw new Error("Failed to fetch task");
  }
});

// update task title
const updateTask = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { title: req.body.title } },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// delete task
const deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.redirect("/");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = {
  getIndex,
  createTask,
  showSingleTask,
  updateTask,
  deleteTask,
};
