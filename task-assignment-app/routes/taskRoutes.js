const express = require("express");
const router = express.Router();
const {
  getIndex,
  createTask,
  showSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const {
  createRow,
  updateRow,
  deleteRow,
} = require("../controllers/rowControllers");
const {
  createContent,
  deleteContent,
  updateContent,
  transferContent,
} = require("../controllers/contentControllers");
const validateToken = require("../middleware/validateTokenHandler");
const cookieParser = require("cookie-parser");


router.use(cookieParser())
router.use(function (req, res, next) {
  req.headers.authorization = req.cookies.accessToken;
  return next()
});
router.use(validateToken);

router.route("/").get(getIndex);
router.route("/tasks").post(createTask);
router
  .route("/tasks/:id")
  .get(showSingleTask)
  .put(updateTask)
  .delete(deleteTask)
  .patch(createRow);
router
  .route("/tasks/:id/:rowId")
  .put(updateRow)
  .delete(deleteRow)
  .patch(createContent);
router
  .route("/tasks/:id/:rowId/:contentId")
  .delete(deleteContent)
  .put(updateContent)
  .trace(transferContent);

module.exports = router;
