const userModel = require("../Model/usersModel");


async function signup(req, res) {
  try {
      let user = req.body;
      let newUser = await userModel.create({
          name: user.name,
          email: user.email,
          password:user.password,
          confirmPassword:user.confirmPassword,
          role:user.role
      })
      console.log(newUser);
      res.status(201).json({
          message:"Succesfully Signed up !!",
          data: newUser
      })
  } catch (error) {
      res.status(501).json({
          message:"Failed to sign up !!",
          error
      })
  }
}

async function login(req, res) {
    try{
        let {email , password} = req.body;
        console.log(email , password);
        let loggedInUser = await userModel.find({email:email});
        if(loggedInUser.length){
            let user = loggedInUser[0];
            if(user.password == password){
                res.status(200).json({
                    message:"Logged in succesfully !!",
                    data : loggedInUser[0]
                })
            }
            else{
                res.status(501).json({
                    message:"Email and Password didn't Matched !!",
                })
            }
        }
        else{
            res.status(501).json({
                message:"No User Found SignUp First",
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Login Failed !!",
            error
        })
    }
}

module.exports.signup = signup;
module.exports.login = login;
