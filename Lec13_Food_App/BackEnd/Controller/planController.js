// const plans = require("../Model/plansModel.json")
// const {v4 : uuidv4} = require("uuid");
// let fs = require("fs");
// let path = require("path");
const planModel = require("../Model/plansModel");


async function createPlan(req, res) {
  try{
    let sentPlan = req.body;
    let plan = await planModel.create(sentPlan);
    res.status(200).json({
      message:"Plan Created Succesfully",
      data :plan
    })
  }
  catch(error){
    res.status(501).json({
      message:"Failed to create a plan",
      error : error.errors.discount.message
    })
  }
  
}

function getAllPlans(req, res) {



}
function getPlanById(req, res) {
  let { id } = req.params;

  let filteredPlans = plans.filter(function (plan) {
    return plan.id == id;
  });
  if (filteredPlans.length) {
    res.status(200).json({
      message: "Succesfully get plan by id",
      data: filteredPlans[0],
    });
  } else {
    res.status(404).json({
      message: "Plan Not found !!!",
    });
  }
}
function updatePlanById(req, res) {
  let { id } = req.params;
  let updateObj = req.body;
  // { "plan":"", "food":"" }
  let filteredPlan = plans.filter(function (plan) {
    return plan.id == id;
  });
  if (filteredPlan.length) {
    let plan = filteredPlan[0];
    for (key in updateObj) {
      plan[key] = updateObj[key];
    }
    fs.writeFileSync("../Model/plansModel.json", JSON.stringify(plans));
    res.status(200).json({
      message: "Plan Updated !!!",
    });
  } else {
    res.status(404).json({
      message: "Plan Not found !!!",
    });
  }
}
function deletePlanById(req, res) {
  let { id } = req.params;
  let filteredPlans = plans.filter(function (plan) {
    return plan.id != id;
  });
  if (filteredPlans.length == plans.length) {
    res.status(404).json({
      message: "Plan not found !!",
    });
  } else {
    fs.writeFileSync("../Model/plansModel.json", JSON.stringify(filteredPlans));
    res.status(200).json({
      message: "Plan deleted Successfully !!!",
    });
  }
}

module.exports.getAllPlans = getAllPlans;
module.exports.createPlan = createPlan;
module.exports.getPlanById = getPlanById;
module.exports.updatePlanById = updatePlanById;
module.exports.deletePlanById = deletePlanById;