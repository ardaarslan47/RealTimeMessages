const express = require("express");
const {
  registerUser,
  loginUser,
  loginPage,
} = require("../controllers/userController");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

function resetAuth(req, res, next) {
  res.clearCookie("accessToken");
  next();
}

router.post("/register", registerUser);
router.route("/login").get(resetAuth, loginPage).post(loginUser);

module.exports = router;
