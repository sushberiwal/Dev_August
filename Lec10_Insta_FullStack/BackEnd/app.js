// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const userDB = require("./db/users.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");



// server created
const app = express();

// api logic

// req = request => from ui , from postman
// res = response => to ui , to postman
// to see data in request body use this
// middleware function


// user defined middleware function

// app.use(function(req,res,next){
//     console.log("Before express.json");
//     console.log("Req Body = " , req.body);
//     next();
// });


app.use(express.json());


// app.use(function(req,res,next){
//     console.log("After express.json");
//     console.log("Req Body = " , req.body);

//     let allKeys = Object.keys(req.body);
//     if(allKeys.length == 0){
//         res.json({
//             message : "Body cannot be empty !!"
//         })
//     }
//     else{
//         next();
//     }
// });

// app.get("/home" , function(req,res){
//     console.log(req.body);

//     res.json({
//         message : "success",
//         data : req.body
//     })
// })




function insertUser(user){
    return new Promise( (resolve,reject)=>{
        let uid = user.uid;
        let name = user.name;
        let email = user.email;
        let bio = user.bio;
        let handle = user.handle;
        let phone = user.phone;

        // insert query => app.js => cloud db in table user_table
        let sql = `INSERT INTO user_table(uid, name, email, phone, bio, handle) VALUES ('${uid}','${name}','${email}',${phone},'${bio}','${handle}')`;
        connection.query(sql , function (error, results) {
           if(error){
               reject(error);
           }
           else{
               resolve(results);
           }
        });

    });
}

const createUser = async (req,res) => {
    try{
        let uid = uuidv4();
        let user = req.body;
        user.uid = uid;
        let result = await insertUser(user);
        res.json({
            "message":"User created Succesfully !",
            "data" : result
        })
    }
    catch(err){
        res.json({
            "message":"User creation failed !!",
            "error":err
        })
    }

}



// post a user => add a user in userDB
app.post("/user" , createUser);
const getAllUsers = (req,res) => {
    console.log(req.body);
    res.json({
        message :"Succesfully get all user",
        data : userDB.length ? userDB : "User DB empty !"
    })
} 
const getById = (req,res) =>{
    let {uid} = req.params;
    // array
    let user = userDB.filter(  (userObj) => { return userObj.uid == uid  } );
    console.log(user);
    if(user.length){
        res.json({
            message:"get a user by id successfully",
            data : user[0]
        })
    }
    else{
        res.json({
            message:"User not found !!"
        })
    }
}
const updateUser = (req,res)=>{
    let {uid} = req.params;
    let users = userDB.filter( (userObj) => {return userObj.uid == uid} );
    
    if(users.length){
        let userToBeUpdated = users[0];
        console.log(userToBeUpdated);
        let updateObject = req.body;
        for(let key in updateObject){
            userToBeUpdated[key] = updateObject[key];
        }
        console.log(userToBeUpdated);
        fs.writeFileSync("./db/users.json" , JSON.stringify(userDB));
        res.json({
            message:"User updated succesfully",
            data : userToBeUpdated
        })
    }
    else{
        res.json({
            message:"User Not Found !!"
        })
    }
}
const deleteUser = (req,res)=>{
    // splice(idx , count)?
    let {uid} = req.params;
    let userDeleted;
    let newDb = userDB.filter( (userObj) => {
        if(userObj.uid == uid){
            userDeleted = userObj;
        }
        return userObj.uid != uid;
    });
    if(newDb.length != userDB.length){
        fs.writeFileSync("./db/users.json" , JSON.stringify(newDb));
        res.json({
            message :"User Deleted Successfully",
            data : userDeleted
        })
    }
    else{
        res.json({
            message : "User Not Found !"
        })
    }

}
// Create read update delete operations (CRUD);
// arrow function
// get all user
app.get("/user" , getAllUsers);
app.get("/user" , getAllUsers);
// get a user with the help of uid
app.get("/user/:uid" , getById);
// update a user with the help of uid
app.patch("/user/:uid" , updateUser);
// delete a user with the help if uid
app.delete("/user/:uid" , deleteUser);

app.listen(3000 , () => {
    console.log("Server started at port 3000 ");
})