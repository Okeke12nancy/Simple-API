const express = require("express");
const userRouter = express.Router();
const { protect, isAuthorized } = require("../middlewares/auth");
const userController = require("../controllers/userController");

userRouter.get("/", isAuthorized(), userController.findUsers);
userRouter.get("/:id", isAuthorized(), userController.findOneUser);
userRouter.put("/:id", isAuthorized(), userController.updateUser);
userRouter.delete("/:id", isAuthorized(), userController.deleteOneUser);

module.exports = userRouter;
