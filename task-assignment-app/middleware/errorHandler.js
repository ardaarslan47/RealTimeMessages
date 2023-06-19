const { constants } = require("../contants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      redirectWithError(req, res, err.message);
      break;
    case constants.NOT_FOUND:
      redirectWithError(req, res, err.message);
      break;
    case constants.UNAUTHORIZED:
      res.redirect("/login")
      break;
    case constants.FORBIDDEN:
      redirectWithError(req, res, err.message);
      break;
    case constants.SERVER_ERROR:
      redirectWithError(req, res, err.message);
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
};

// Define a custom method on the response object to redirect with an error message
const redirectWithError = function (req, res, message) {
  res.cookie("error", message);
  res.redirect(req.get("referer"));
};

module.exports = errorHandler;
