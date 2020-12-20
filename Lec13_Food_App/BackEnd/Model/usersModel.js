const mongoose = require("mongoose");
const { DB_LINK } = require("../config/secrets");



mongoose
  .connect(
    DB_LINK,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((db) => {
    console.log("Connected to db !!!");
  });

let userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String ,
    required:true,
    unique:true
  },
  password:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    required:true
  } ,
  confirmPassword:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    validate : {
      validator: function(){
        return this.password == this.confirmPassword;
      } ,
      message:"Password didn't matched !!"
    }
  },
  role:{
    type:String,
    enum:["admin" , "user" , "restaurant owner" , "delivery boy"],
    default:"user"
  }
})


// it will run before create is called on userModel
userSchema.pre("save" , function(){
  this.confirmPassword = undefined;
})

const userModel = mongoose.model("userscollection" , userSchema);
module.exports = userModel;