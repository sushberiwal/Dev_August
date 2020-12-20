const userModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/secrets");

async function signup(req, res) {
  try {
    let user = req.body;
    let newUser = await userModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });
    console.log(newUser);
    res.status(201).json({
      message: "Succesfully Signed up !!",
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to sign up !!",
      error,
    });
  }
}
async function login(req, res) {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    let loggedInUser = await userModel.find({ email: email });
    if (loggedInUser.length) {
      let user = loggedInUser[0];
      if (user.password == password) {
        // token ban na chahie
        const token = jwt.sign({ id: user["_id"] }, SECRET_KEY);
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: loggedInUser[0],
          token,
        });
      } else {
        res.status(501).json({
          message: "Email and Password didn't Matched !!",
        });
      }
    } else {
      res.status(501).json({
        message: "No User Found SignUp First",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "Login Failed !!",
      error,
    });
  }
}

async function protectRoute(req, res, next) {
  try {
      const {token} = req.body;
      console.log("Inside protectRoute function");
    //   console.log(token);
      const payload = jwt.verify(token , SECRET_KEY);
      console.log(payload);
      if(payload){
          // id is stuffed into req.id
          req.id = payload.id;
          next();
      }
      else{
          res.status(501).json({
              message:"Please Log in !!"
          })
      }
  } catch (error) {
    res.status(501).json({
        message:"Please Log in !!",
        error
    })
  }
}


async function isAuthorized(req , res , next){
  try{
    let id = req.id;
    let user = await userModel.findById(id);
    console.log(user);
    if(user.role == "admin"){
      next();
    }else{
      res.status(200).json({
        message:"You dont have admin rights !!!"
      })
    }
  }
  catch(error){
    res.status(501).json({
      message:"Failed to Authorize",
      error
    })
  }
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized = isAuthorized;
