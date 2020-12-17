const express = require("express");

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
.get(getAllPlans)
.post(createPlan);

planRouter
  .route("/:id")
  .get(getPlanById)
  .patch(updatePlanById)
  .delete(deletePlanById);

module.exports = planRouter;
