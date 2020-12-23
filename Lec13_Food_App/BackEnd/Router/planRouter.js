const express = require("express");
const { protectRoute , isAuthorized } = require("../Controller/authController");

const planRouter = express.Router();

const {
  getAllPlans,
  createPlan,
  getPlanById,
  updatePlanById,
  deletePlanById,
} = require("../Controller/planController");






planRouter
.route("")
.get( protectRoute , getAllPlans)
.post(createPlan);


planRouter
  .route("/:id")
  .get( protectRoute , getPlanById)
  .patch( protectRoute , isAuthorized , updatePlanById)
  .delete( protectRoute, isAuthorized , deletePlanById);

module.exports = planRouter;

// req.id = id
