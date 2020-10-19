// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const userDB = require("./db/users.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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

function insertUser(user) {
  return new Promise((resolve, reject) => {
    let uid = user.uid;
    let name = user.name;
    let email = user.email;
    let bio = user.bio;
    let handle = user.handle;
    let phone = user.phone;

    // insert query => app.js => cloud db in table user_table
    let sql = `INSERT INTO user_table(uid, name, email, phone, bio, handle) VALUES ('${uid}','${name}','${email}',${phone},'${bio}','${handle}')`;
    connection.query(sql, function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
const createUser = async (req, res) => {
  try {
    let uid = uuidv4();
    let user = req.body;
    user.uid = uid;
    let result = await insertUser(user);
    res.json({
      message: "User created Succesfully !",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "User creation failed !!",
      error: err,
    });
  }
};
// post a user => add a user in userDB
app.post("/user", createUser);

function getUsers() {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM user_table;`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

const getAllUsers = async (req, res) => {
  try {
    let users = await getUsers();
    console.log(users);
    res.json({
      message: "Succesfully got all users !",
      data: users,
    });
  } catch (err) {
    res.json({
      message: "get all users failed !",
      error: err,
    });
  }
};
// get all user
app.get("/user", getAllUsers);

function getUserById(uid) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM user_table WHERE uid="${uid}"`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

const getById = async (req, res) => {
  try {
    let uid = req.params.uid;
    console.log(uid);
    let user = await getUserById(uid);
    res.json({
      message: "Got user by id succesfully !",
      data: user[0],
    });
  } catch (err) {
    res.json({
      message: "Failed to get user by id",
      error: err,
    });
  }
};
// get a user with the help of uid
app.get("/user/:uid", getById);

function deleteById(uid) {
  return new Promise(function (resolve, reject) {
    let sql = `DELETE FROM user_table WHERE uid = "${uid}";`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

const deleteUser = async (req, res) => {
  try {
    let uid = req.params.uid;
    let data = await deleteById(uid);
    console.log(data);
    res.json({
      message: "User deleted Succesfully",
      data: data,
    });
  } catch (err) {
    res.json({
      message: "failed to delete user",
      error: err,
    });
  }
};
// delete a user with the help if uid
app.delete("/user/:uid", deleteUser);

function updateById(uid, updateObject) {
  return new Promise((resolve, reject) => {
    // name , bio , handle

    let sql = `UPDATE user_table SET`;

    for (key in updateObject) {
      sql += ` ${key} = "${updateObject[key]}" ,`;
    }

    sql = sql.slice(0, -1);
    sql += `WHERE uid = "${uid}";`;
    console.log(sql);
    // UPDATE user_table SET
    //  name = "" , bio = "" , handle = "" ,
    // WHERE uid = ""

    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// nodejs code => express abstraction

const updateUser = async (req, res) => {
  try {
    let uid = req.params.uid;
    let updateObject = req.body;
    // console.log(uid);
    // console.log(updateObject);
    let result = await updateById(uid, updateObject);
    res.json({
      message: "User updated succesfylly",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Failed to update user",
      error: err,
    });
  }
};
// Create read update delete operations (CRUD);
// arrow function

// update a user with the help of uid
app.patch("/user/:uid", updateUser);

/// REQUESTS START FROM HERE

// send request
function addInFollowingTable(obj){
    return new Promise((resolve , reject)=>{
        let sql; 
        if(obj.isPublic){
            sql = `INSERT INTO user_following(uid , follow_id, is_accepted) VALUES ("${obj.uid}" , "${obj.followId}" , "1") ;`;
        }
        else{
            sql = `INSERT INTO user_following(uid , follow_id ) VALUES ("${obj.uid}" , "${obj.followId}");`;
        }
        console.log(sql);
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
function addInFollowerTable(follower_id , uid){
    return new Promise( (resolve , reject)=>{
        let sql = `INSERT INTO user_follower(uid , follower_id) VALUES ("${uid}" , "${follower_id}");`;
        console.log(sql);
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
const sendRequest = async (req, res) => {
  try {
    let { uid, follow_id } = req.body;
    let user = await getUserById(follow_id);
    let isPublic = user[0].is_public;
    // console.log(isPublic);
    if (isPublic) {
      // addInFollowingTable
      let followingResult = await addInFollowingTable({
        isPublic: true,
        uid: uid,
        followId: follow_id,
      });
      // addInFollowerTable
      let followerResult = await addInFollowerTable(uid , follow_id);
      res.json({
          message:"request sent and accepted !",
          data : {followingResult , followerResult}
      })
    } else {
      // addInFollowingTable with is_accepted false
      let followingResult = await addInFollowingTable({
        isPublic: false,
        uid: uid,
        followId: follow_id,
      });
      res.json({
          message:"Request sent and it is pending !",
          data : followingResult
      })
    }
  } catch (err) {
      res.json({
          message:"Failed to send request",
          error : err
      })
  }
};

app.post("/user/request", sendRequest);


//



app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
