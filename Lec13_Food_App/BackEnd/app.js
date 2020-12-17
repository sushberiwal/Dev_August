const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");

const app = express();

// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use( express.json());

// app.httpMethod( appRoute , cb function( request , response   )      )
app.use("/api/plans" , planRouter);
app.use("/api/user" , userRouter);


app.listen(3000, function () {
  console.log("server started at port 3000");
});
