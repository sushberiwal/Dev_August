const express = require("express");
const { getDemoPage } = require("../Controller/viewController");

const viewRouter = express.Router();




viewRouter.route("").get(getDemoPage);



module.exports = viewRouter;