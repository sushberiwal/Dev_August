const express = require("express");
const app = express();
const ejs = require("ejs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const connection = require("./connection");
const cookieSession = require("cookie-session");

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['asdfafs']
}))

function insertUser(profile){
    return new Promise((resolve , reject)=>{
        let uid = profile.uid;
        let name = profile.name;
        let imageUrl = profile.pImage;
        let sql = `INSERT INTO user_google(uid , name , pImage ) VALUES ( '${uid}' , '${name}', '${imageUrl}')`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}  


function getUserById(uid){
    return new Promise((resolve , reject)=>{
        let sql = `SELECT * FROM user_google WHERE uid = '${uid}'`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}


passport.serializeUser( (user,done)=>{
    console.log("Inside serialize user");
    console.log(user);
    done(null , user.uid); 
})


passport.deserializeUser( (id,done)=>{
    console.log("inside deserialize user !");
    getUserById(id).then((user)=>{
        console.log(user);
        done(null , user);
    })
})

app.use(passport.initialize());
app.use(passport.session());



passport.use(
  new GoogleStrategy(
    {//options for strategy
      clientID:"886797572833-87ar3vp4n9s5gtom9eetsqt16jlporug.apps.googleusercontent.com",
      clientSecret: "TdiJGNh70nVUogSs8pRkUXuA",
      callbackURL: "/auth/callback",
    },
    async (accessToken , refreshToken , profile , done) => {
      // passport callback function
      console.log("passport callback function");
      console.log(profile);
      let uid = profile.id;
      let name = profile.displayName;
      let pImage = profile.photos[0].value;
      let userObject = {uid , name , pImage};
      let userData = await getUserById(uid);
      if(userData.length){
          console.log("user already signed up");
          console.log(userData);
          done(null , userData[0]);
      }
      else{
          let createUserData = await insertUser(userObject);
          console.log("user created first time");
          console.log(createUserData);
          done(null , userObject);
      }
    }
  )
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home"  , {user:req.user});
});
app.get("/auth/login", (req, res) => {
  res.render("login" , {user:req.user});
});
app.get("/auth/google", passport.authenticate("google" , { scope:['profile']} ));

const authChecker = (req , res , next) =>{
    if(!req.user){
        console.log(req.user);
        res.redirect("/auth/login");
    }
    else{
        next();
    }
}

app.get("/profile/" ,  authChecker ,  (req,res)=>{
    res.render('profile', {user:req.user} );
})

app.get("/auth/callback" , passport.authenticate("google") , (req , res)=>{
    console.log("inside callback url !")
    res.redirect("/profile/")
    // console.log(req);
    // res.end("Reached callback url !!");
});

app.get("/auth/logout",  (req, res) => {
  //handle with passport
//   res.end("logging out !!");
   req.logout();
   res.redirect("/");
});

app.listen(4000, () => {
  console.log("app is listening at port 4000 !!");
});