const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/authContollers");
const validate = require("../middlewares/validate.middlewares");
const { registerSchema, loginSchema } = require("../validations/schema");

const { protect } = require("../middlewares/auth");

// Register User
authRouter.post(
  "/register",
  [validate(registerSchema)],
  authController.register
);

// // User Login
authRouter.post(
  "/login",
  [validate(loginSchema)],
  protect,
  authController.login
);

// exports.default = authRouter;
module.exports = authRouter;
