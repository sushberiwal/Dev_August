const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// function sendEmail() {
//     // object =>  info
//     const transporter = nodemailer.createTransport(smtpTransport({
//       service:"gmail",
//       host: "smtp.gmail.com",
//       auth: {
//         user: "sushantberiwal@gmail.com",
//         pass: "csuhnjrwxrdtpbct",
//       },
//     }));

//     transporter.sendMail({
//       from: "sushantberiwal@gmail.com", // sender address
//       to: "tyagiakash926@gmail.com", // list of receivers
//       subject: "Hello", // Subject line
//       text: "Hello I am testing node mailer !!", // plain text body
//       html: "<b>Hello I am testing this stuff !!!</b>", // html body
//     }).then(data =>{
//       console.log(data);
//     }).catch(err =>{
//       console.log(err);
//     })

// }
// sendEmail();

// var transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: "sushantberiwal@gmail.com",
//       pass: "csuhnjrwxrdtpbct",
//     },
//   })
// );

// var mailOptions = {
//   from: "sushantberiwal@gmail.com", // sender address
//   to: "sushant.beriwal@pepcoding.com", // list of receivers
//   subject: "Sending Email using Node.js[nodemailer]",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

// use wala method hmesha chalta hai
// app.use(   )
// app.use(express.json());

// app.use( isAdmin( [ "admin"  , "restaurantOwner"] )  );

// 100 methiods => isAdmin true
// app.get("" ,  getAll );
// app.post("" ,  deleteAll );
// app.patch("" , updateAll);

// function isAdmin(roles){
// //roles
// // closure
//     return function(req , res , next){
//         console.log("inside middle ware function");
//         console.log(req.body.role);

//         if(roles.includes(req.body.role)){
//             next();
//         }else{
//             res.json({
//                 message:"You are not authorized !!!"
//             })
//         }
//     }
// }

// function getAll(req , res){
//     res.json({
//         data:"All users !!!"
//     })
// }

// function checkGet(){
//     // res.json({
//     //     data: "check get function called !!!"
//     // })
//     console.log("Inside check Get function");

//     return function(req , res){
//         res.json({
//             data:"I am returned from checkGet function"
//         })
//     };
// }

app.listen(5500, function () {
  console.log("Server started at 5500 !!");
});
