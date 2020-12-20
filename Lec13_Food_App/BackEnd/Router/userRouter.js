const express = require("express");
const userRouter = express.Router();


const { signup, login } = require("../Controller/authController");

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

userRouter.post("/signup" , signup );
userRouter.post("/login" , login );

module.exports = userRouter;
