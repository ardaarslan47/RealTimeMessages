const asyncHandler = require("express-async-handler");
const { Task, Row, ContentOfRow } = require("../models/tasks");

// create content of row
const createContent = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId } = req.params;
    const { contentTitle, contentDescription } = req.body;

    const newContent = new ContentOfRow({
      title: contentTitle,
      description: contentDescription,
    });

    const updatedTask = await Task.updateOne(
      { _id: id },
      { $push: { "content.$[outer].content": newContent } },
      { arrayFilters: [{ "outer._id": rowId }] }
    );

    if (updatedTask.nModified === 0) {
      res.status(404);
      throw new Error("Task or Row not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// delete content of row
const deleteContent = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId, contentId } = req.params;

    const updatedTask = await Task.updateOne(
      { _id: id, "content._id": rowId },
      { $pull: { "content.$.content": { _id: contentId } } }
    );

    if (updatedTask.nModified === 0) {
      res.status(404);
      throw new Error("Content not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// update content of row
const updateContent = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId, contentId } = req.params;
    const { newTitle, newDescription } = req.body;

    const updatedTask = await Task.updateOne(
      { _id: id },
      {
        $set: {
          "content.$[outer].content.$[inner].title": newTitle,
          "content.$[outer].content.$[inner].description": newDescription,
        },
      },
      { arrayFilters: [{ "outer._id": rowId }, { "inner._id": contentId }] }
    );

    if (updatedTask.nModified === 0) {
      res.status(404);
      throw new Error("Content not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// transfer content
const transferContent = asyncHandler(async (req, res, next) => {
  try {
    const { id, rowId, contentId } = req.params;
    const { newRow, title, description } = req.body;

    const pullResult = await Task.updateOne(
      { _id: id },
      { $pull: { "content.$[outer].content": { _id: contentId } } },
      { arrayFilters: [{ "outer._id": rowId }] }
    );

    if (pullResult.nModified === 0) {
      res.status(404);
      throw new Error("Content not found");
    }

    const content = new ContentOfRow({
      title: title[0],
      description: description[0],
    });

    const pushResult = await Task.updateOne(
      { _id: id },
      { $push: { "content.$[outer].content": content } },
      { arrayFilters: [{ "outer._id": newRow }] }
    );

    if (pushResult.nModified === 0) {
      res.status(404);
      throw new Error("New row not found");
    }

    res.redirect(`/tasks/${id}`);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = {
  createContent,
  deleteContent,
  updateContent,
  transferContent,
};
