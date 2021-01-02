const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const bookingRouter = require("./Router/bookingRouter");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser"); 
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use( express.json());
app.use(cookieParser());


app.use(express.static(__dirname+"/public"));
// app.httpMethod( appRoute , cb function( request , response))

// view engine set
app.set("view engine" , "pug");

// view path set
app.set("views" , path.join(__dirname,"View"));

app.use("/api/booking" , bookingRouter);
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);
app.use("" , viewRouter);

app.listen(3000, function () {
  console.log("server started at port 3000");
});
