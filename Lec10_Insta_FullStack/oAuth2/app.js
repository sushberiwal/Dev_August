const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "886797572833-87ar3vp4n9s5gtom9eetsqt16jlporug.apps.googleusercontent.com",
      clientSecret: "TdiJGNh70nVUogSs8pRkUXuA",
      callbackURL: "/auth/callback",
    },
    (accessToken , refreshToken , profile , done) => {
        console.log(profile);
    }
  )
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.send("logging out !!");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/auth/callback" , passport.authenticate("google") , (req,res)=>{
    res.send("logged in");
    // res.redirect("/profile");
})

app.listen(4000, () => {
  console.log("app is listening at port 4000");
});
