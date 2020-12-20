const express = require("express");
const fs = require("fs");
const plans = require("./db/plans.json");
const userDB = require("./db/users.json");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../../BackEnd/Model/usersModel");
const jwt = require("jsonwebtoken");
const app = express();






// const mongoose = require("mongoose");
// promise based function => pending promise denge mongoose ke functions
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.ygusz.mongodb.net/food?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then((db) => {
//     console.log(db);
//   });
//schema
// let planSchema = new mongoose.Schema({
//   name:String,
//   price:Number
// });
// // schema will compile into a collection
// const planModel = mongoose.model("plancollection" , planSchema);

// planModel.create({
//   name:"Non vegan",
//   price:50 ,
//   discout:10
// }).then( (plan)=>{
// console.log(plan);
// })
// .catch(  (error)=>{
//   console.log(error);
// })


// database => collections => documents

// middlewares
// user defined middlewares

// app.use(   function(req , res , next){
//   console.log(" I am called before express.json ");
//   console.log(req.body);

//   next();
// }  )

// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use(express.json());




app.post("/tokenCreator" ,async function(req , res){
  try{
    // let {email , password} = req.body;
    // response => token bhi bhejdo
                            // payload          // secret key
    const token = jwt.sign( {id:"12123132",name:"sushant"} , "absjfbajsfbajbsh" );
    console.log(token);
    res.json({
      token
    })
  }
  catch(error){
    res.json({
      message:"Failed to create token !!!"
    })
  }
})

app.post("/tokenVerify" , function(req , res){
  const {token} = req.body;
  console.log(token);
  const payload = jwt.verify(token ,"absjfbajsfbajbsh");
  console.log(payload);
})



// app.use(function(req , res , next){
//   console.log("I am called after express.json");
//   console.log(req.body);
//   next();
// })

// app.httpMethod( appRoute , cb function( request , response   )      )

// ##################################### Users ###################################################
// user => get all users , get user by id , update a user , delete a user , create a user
function getAllUsers(req, res) {
  if (userDB.length) {
    res.status(200).json({
      message: "Got all users successfully",
      data: userDB,
    });
  } else {
    res.status(200).json({
      message: "No users found !!!",
    });
  }
}
function createUser(req, res) {
  let user = req.body;
  user.id = uuidv4();
  userDB.push(user);
  fs.writeFileSync("./db/users.json", JSON.stringify(userDB));

  res.status(201).json({
    message: "Successfully create a user !",
    data: userDB,
  });
}
function getUserById(req, res) {
  let { id } = req.params;

  let filteredUsers = userDB.filter(function (user) {
    return user.id == id;
  });
  if (filteredUsers.length) {
    res.status(200).json({
      message: "Succesfully get user by id",
      data: filteredUsers[0],
    });
  } else {
    res.status(404).json({
      message: "User Not found !!!",
    });
  }
}
function updateUserById(req, res) {
  let { id } = req.params;
  let updateObj = req.body;
  // { "plan":"", "food":"" }
  let filteredUser = userDB.filter(function (user) {
    return user.id == id;
  });
  if (filteredUser.length) {
    let user = filteredUser[0];
    for (key in updateObj) {
      user[key] = updateObj[key];
    }
    fs.writeFileSync("./db/users.json", JSON.stringify(userDB));
    res.status(200).json({
      message: "User Updated !!!",
    });
  } else {
    res.status(404).json({
      message: "User Not found !!!",
    });
  }
}
function deleteUserById(req, res) {
  let { id } = req.params;
  let filteredUsers = userDB.filter(function (user) {
    return user.id != id;
  });
  if (filteredUsers.length == userDB.length) {
    res.status(404).json({
      message: "User not found !!",
    });
  } else {
    fs.writeFileSync("./db/users.json", JSON.stringify(filteredUsers));
    res.status(200).json({
      message: "User deleted Successfully !!!",
    });
  }
}

app.get("/api/user", getAllUsers);

app.post("/api/user", createUser);

app.get("/api/user/:id", getUserById);

app.patch("/api/user/:id", updateUserById);

app.delete("/api/user/:id", deleteUserById);

// #################################   Plans ##############################################3

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
  fs.writeFileSync("./db/plans.json", JSON.stringify(plans));

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
    fs.writeFileSync("./db/plans.json", JSON.stringify(plans));
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
    fs.writeFileSync("./db/plans.json", JSON.stringify(filteredPlans));
    res.status(200).json({
      message: "Plan deleted Successfully !!!",
    });
  }
}
// get all plans
app.get("/api/plans", getAllPlans);
// create a plan
app.post("/api/plans", createPlan);
// get plan by id
app.get("/api/plans/:id", getPlanById);
// update a plan
app.patch("/api/plans/:id", updatePlanById);
// delete a plan by id
app.delete("/api/plans/:id", deletePlanById);

app.listen(3000, function () {
  console.log("server started at port 3000");
});
