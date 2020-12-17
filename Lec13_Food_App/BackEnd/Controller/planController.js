const plans = require("../Model/plansModel.json")
const {v4 : uuidv4} = require("uuid");
let fs = require("fs");


function getAllPlans(req, res) {
  if (plans.length) {
    res.status(200).json({
      message: "Succesfully got all plans",
      data: plans,
    });
  } else {
    res.status(200).json({
      message: "No Food Plans Found ",
    });
  }
}
function createPlan(req, res) {
  let plan = req.body;
  plan.id = uuidv4();
  plans.push(plan);

  fs.writeFileSync("../Model/plansModel.json", JSON.stringify(plans));

  res.status(201).json({
    message: "Successfully create a plan !",
    data: plans,
  });
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