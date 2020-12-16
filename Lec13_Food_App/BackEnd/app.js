const express = require("express");
const fs = require("fs");
const plans = require("./db/plans.json");
const users = require("./db/plans.json");
const { v4: uuidv4 } = require("uuid");

const app = express();

// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use(express.json());

// app.httpMethod( appRoute , cb function( request , response   )      )

// get all plans
app.get("/api/plans", function (req, res) {
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
});
// create a plan
app.post("/api/plans", function (req, res) {
  let plan = req.body;
  plan.id = uuidv4();
  plans.push(plan);
  fs.writeFileSync("./db/plans.json", JSON.stringify(plans));

  res.status(201).json({
    message: "Successfully create a plan !",
    data: plans,
  });
});
// get plan by id
app.get("/api/plans/:id", function (req, res) {
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
});
// update a plan
app.patch("/api/plans/:id" , function(req , res){
    let {id} = req.params;
    let updateObj = req.body;
    // { "plan":"", "food":"" }
    let filteredPlan = plans.filter(function(plan){
        return plan.id == id;
    })
    if(filteredPlan.length){
        let plan = filteredPlan[0];
        for(key in updateObj){
            plan[key] = updateObj[key];
        }
        fs.writeFileSync("./db/plans.json" , JSON.stringify(plans));
        res.status(200).json({
            message: "Plan Updated !!!",
          });
    }
    else{
        res.status(404).json({
            message: "Plan Not found !!!",
          });
    }
})
// delete a plan by id
app.delete("/api/plans/:id", function (req, res) {
  let { id } = req.params;
  let filteredPlans = plans.filter(function (plan) {
    return plan.id != id;
  });
  if(filteredPlans.length == plans.length){
      res.status(404).json({
        message: "Plan not found !!",
      });
  }else{
      fs.writeFileSync("./db/plans.json", JSON.stringify(filteredPlans));
      res.status(200).json({
        message: "Plan deleted Successfully !!!",
      });
  }
});

app.listen(3000, function () {
  console.log("server started at port 3000");
});
