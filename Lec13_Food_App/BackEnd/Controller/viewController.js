const planModel = require("../Model/plansModel");


// function getDemoPage(req, res) {
//   // send demo page to client
//   // res.render("demo.pug" , {title:"Demo Page" , content:"I am coming from object"});
//   res.render("base.pug");
// }

function getHomePage(req, res) {
  res.render("homepage.pug" , {name:req.name});
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