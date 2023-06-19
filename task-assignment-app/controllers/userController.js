const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");

const loginPage = asyncHandler(async (req, res) => {
  if (req.cookies.hasOwnProperty("error")) {
    const message = req.cookies.error;
    res.clearCookie("error"); // Clear the 'error' cookie after retrieving its value
    return res.render("login", { message });
  }
  res.render("login");
});

const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400);
    throw new Error("Fill all Fields");
  }
  const userAvailable = await User.findOne({ userName });
  if (userAvailable) {
    res.status(400);
    throw new Error("username taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    password: hashedPassword,
  });
  if (user) {
    res.redirect("/login");
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.redirect("/login");
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  const user = await User.findOne({ userName });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.cookie("accessToken", accessToken, {
      maxAge: 20 * 60 * 1000, // 20 minutes in milliseconds
      httpOnly: true, // Only accessible via HTTP (not JavaScript)
    });
    res.redirect("/");
  } else {
    res.status(401);
    throw new Error("Username or password is not valid");
  }
  res.status(500);
  throw new Error("something wrong");
});

module.exports = {
  registerUser,
  loginUser,
  loginPage,
};
