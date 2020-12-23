const express = require("express");
const userRouter = express.Router();


const { signup, login, protectRoute , forgetPassword , resetPassword } = require("../Controller/authController");

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

userRouter.post("/signup" , signup );
userRouter.post("/login" , login);
userRouter.post("/forgetpassword" , forgetPassword);
userRouter.patch("/resetpassword/:token" , resetPassword);

// userRouter
// .route("")
// .get(getAllUsers);

// localhost:3000/api/users => get request
userRouter
  .route("")
  .get( protectRoute , getUserById)
  .patch( protectRoute , updateUserById)
  .delete( protectRoute , deleteUserById);


module.exports = userRouter;
