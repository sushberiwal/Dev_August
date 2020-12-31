const planModel = require("../Model/plansModel");


// function getDemoPage(req, res) {
//   // send demo page to client
//   // res.render("demo.pug" , {title:"Demo Page" , content:"I am coming from object"});
//   res.render("base.pug");
// }

async function getHomePage(req, res) {
  try{
    let plans = await planModel.find(); 
    plans = plans.splice(0 , 3);
    res.render("homepage.pug" , {name:req.name , plans});
  }
  catch(error){
    console.log(error);
  }
}

function getProfilePage(req ,res){
  res.render("profilePage.pug" , {user : req.user});
}

function getResetPasswordPage(req , res){
  res.render("resetPassword.pug" , {name:req.name});
}

function getLoginPage(req, res) {
  res.render("login.pug" , {name:req.name});
}

function getSignUpPage(req , res){
    res.render("signup.pug" , {name:req.name});
}

async function getPlansPage(req , res){
    try{
        let plans = await planModel.find(); 
        console.log(plans);
        res.render("plans.pug" ,{name:req.name , plans:plans})
    }
    catch(error){
        console.log(error);
    }
}

module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUpPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;