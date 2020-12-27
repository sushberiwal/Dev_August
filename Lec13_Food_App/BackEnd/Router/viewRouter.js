const express = require("express");
const { isLoggedIn , logout } = require("../Controller/authController");
const { getHomePage, getLoginPage, getSignUpPage, getPlansPage } = require("../Controller/viewController");


const viewRouter = express.Router();


viewRouter.use(isLoggedIn);
// next() => logged in => req.name = "steve"
// next() => loggedout => req.name = undefined
viewRouter.route("").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/plans").get(getPlansPage);

module.exports = viewRouter;