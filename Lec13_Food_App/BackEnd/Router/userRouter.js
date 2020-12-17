const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

userRouter
.route("")
.get(getAllUsers)
.post(createUser);

userRouter
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = userRouter;
