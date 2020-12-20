const express = require("express");
const userRouter = express.Router();


const { signup, login, protectRoute } = require("../Controller/authController");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

// userRouter
// .route("")
// .get(getAllUsers)
// .post(createUser);

userRouter
  .route("")
  .get( protectRoute , getUserById)
  .patch( protectRoute , updateUserById)
  .delete( protectRoute , deleteUserById);

userRouter.post("/signup" , signup );
userRouter.post("/login" , login);

module.exports = userRouter;
