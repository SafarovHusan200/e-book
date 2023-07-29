const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");

// Protecting routes
exports.protected = asyncHandler(async (req, res, next) => {
  let token;

  // Authorizion <type> <crentials> Bearer dsfegfuykgfbuyksbfdgsdfg
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.authorization.split(" ")[1];
  }

  if (!token) {
    return next(errorResponse("Not authorization to access this route", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// Grand Access to admins
exports.adminStatus = asyncHandler(async (req, res, next) => {
  if (!req.user.adminStatus) {
    return ErrorResponse(
      "This route can be access only admin status users",
      403
    );
  }

  next();
});
