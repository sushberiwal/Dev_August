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
app.use(express.json());

function userQueries(action, data) {
  return new Promise((resolve, reject) => {
    if (action == "createUser") {
      let user = data.user;
      let uid = user.uid;
      let name = user.name;
      let email = user.email;
      let bio = user.bio;
      let handle = user.handle;
      let phone = user.phone;
      let isPublic = user.is_public;
      let sql = `INSERT INTO user_table(uid, name, email, phone, bio, handle , is_public) VALUES ('${uid}','${name}','${email}',${phone},'${bio}','${handle}', '${isPublic}')`;
      connection.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } else if (action == "getAllUsers") {
      let sql = `SELECT * FROM user_table`;
      connection.query(sql, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } else if (action == "getUserById") {
      let uid = data.uid;
      let sql = `SELECT * FROM user_table WHERE uid = '${uid}'`;
      connection.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else if (action == "deleteById") {
      let uid = data.uid;
      let sql = `DELETE FROM user_table where uid="${uid}"`;
      connection.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } else if (action == "updateUserById"){
        
        let uid = data.uid; //76567567
        let updateObject = data.updateObject; 
        // console.log(updateObject);
        let updateSql = "UPDATE user_table SET";
        // UPDATE user_table SET name= "steve rogers", handle="iamwintersoldier" WHERE uid = "5616515"; 
        for(key in updateObject){
            updateSql+= ` ${key}='${updateObject[key]}',`;
        }
        updateSql = updateSql.slice(0, -1);
        updateSql += ` WHERE uid='${uid}';`;
        console.log(updateSql);

        connection.query(updateSql , function(error,data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    }
  });
}
// post a user => add a user in userDB
const createUser = async (req, res) => {
  try {
    let uid = uuidv4();
    let user = req.body;
    user.uid = uid;
    let result = await userQueries("createUser", { user: user });
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
app.post("/user", createUser);

// get all users from user table
const getAllUsers = async (req, res) => {
  try {
    let result = await userQueries("getAllUsers");
    res.json({
      message: "Successfully got all users",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Failed to get all users !",
      error: err,
    });
  }
};
app.get("/user", getAllUsers);

// get a user with the help of uid
const getById = async (req, res) => {
  try {
    let { uid } = req.params;
    let user = await userQueries("getUserById", { uid: uid });
    res.json({
      message: "succesfully get user by id",
      data: user,
    });
  } catch (err) {
    res.json({
      message: "Cannot get user",
      error: err,
    });
  }
};
app.get("/user/:uid", getById);

// delete a user with the help if uid
const deleteUser = async (req, res) => {
  try {
    let { uid } = req.params;
    let result = await userQueries("deleteById", { uid: uid });
    res.json({
      message: "User deleted Succesfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Cannot delete user",
      error: err,
    });
  }
};
app.delete("/user/:uid", deleteUser);


// update a user with the help of uid
const updateUser = async (req, res) => {
    try{
        let { uid } = req.params;
        
        let result = await userQueries("updateUserById" , {uid:uid , updateObject:req.body});
        res.json({
            message:"user update successfully",
            data : result
        }) 
    }
    catch(err){
        res.json({
            message:"user update failed",
            error:err
        })
    }
  };
app.patch("/user/:uid", updateUser);


// Request

function addInFollowerTable(obj){
    return new Promise((resolve,reject)=>{
        
        let uid = obj.follow_id;
        let follower_id = obj.uid;
        let sql = `INSERT INTO user_follower(uid, follower_id) VALUES ('${uid}','${follower_id}')`;
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

function sendFollowRequest(obj){
    return new Promise(async (resolve,reject)=>{
        let result = await userQueries("getUserById" , {uid:obj.follow_id});
        let isPublic = result[0].is_public;
        if(isPublic == 1){
            //request is send and is accepted
            let uid = obj.uid;
            let follow_id = obj.follow_id;
            await addInFollowerTable({uid , follow_id});
            let sql = `INSERT INTO user_following(uid, follow_id, is_accepted) VALUES ('${uid}','${follow_id}',true)`;
            connection.query(sql , function(error,data){
                if(error){
                    reject(error);
                }
                else{
                    resolve({data , message:"Request accepted "});
                }
            })
        }
        else{
            // request is sent but is pending
            let uid = obj.uid;
            let follow_id = obj.follow_id;
            let sql = `INSERT INTO user_following(uid, follow_id) VALUES ('${uid}','${follow_id}')`;
            connection.query(sql , function(error,data){
                if(error){
                    reject(error);
                }
                else{
                    resolve({data , message:"Pending Request Send"});
                }
            })
        }
    })
}

// send follow request =>
const sendRequest = async (req,res) => {
    try{

        let obj = req.body;
        let result = await sendFollowRequest(obj);
        res.json({
            message:result.message,
            data : result.data
        })
    }
    catch(err){
        res.json({
            "message":"Cant send request",
            "error":err
        })
    }
}
app.post("/user/request" , sendRequest);
// if(account public) => request accepted
// else => request pending
// req.body = {
//     uid : "123123123",
//     
// }







app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
