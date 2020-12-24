const express = require("express");
const { getDemoPage, getHomePage, getLoginPage } = require("../Controller/viewController");

const viewRouter = express.Router();



viewRouter.route("").get(getDemoPage);
viewRouter.route("/home").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);

module.exports = viewRouter;