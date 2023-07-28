const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../helpers/errorResponse");
const User = require("../models/userModels");
const userService = require("../services/userService");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

exports.isAuthorized = () => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        statuscode: 401,
        status: "error",
        message: "No token provided",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(user);

    if (user.data.role === "admin") {
      req.admin = await userService.find({ _id: user.data.userId });
      return next();
    }

    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Unauthorized request! You are not allowed to make a request",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
