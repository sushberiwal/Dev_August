// const userDB = require("../Model/usersModel.json");
const userModel = require("../Model/usersModel");


function getAllUsers(req, res) {
  if (userDB.length) {
    res.status(200).json({
      message: "Got all users successfully",
      data: userDB,
    });
  } else {
    res.status(200).json({
      message: "No users found !!!",
    });
  }
}
function createUser(req, res) {
  let user = req.body;
  user.id = uuidv4();
  userDB.push(user);
  fs.writeFileSync("../Model/usersModel.json", JSON.stringify(userDB));

  res.status(201).json({
    message: "Successfully create a user !",
    data: userDB,
  });
}
function getUserById(req, res) {
  let { id } = req.params;

  let filteredUsers = userDB.filter(function (user) {
    return user.id == id;
  });
  if (filteredUsers.length) {
    res.status(200).json({
      message: "Succesfully get user by id",
      data: filteredUsers[0],
    });
  } else {
    res.status(404).json({
      message: "User Not found !!!",
    });
  }
}
function updateUserById(req, res) {
  let { id } = req.params;
  let updateObj = req.body;
  // { "plan":"", "food":"" }
  let filteredUser = userDB.filter(function (user) {
    return user.id == id;
  });
  if (filteredUser.length) {
    let user = filteredUser[0];
    for (key in updateObj) {
      user[key] = updateObj[key];
    }
    fs.writeFileSync("../Model/usersModel.json", JSON.stringify(userDB));
    res.status(200).json({
      message: "User Updated !!!",
    });
  } else {
    res.status(404).json({
      message: "User Not found !!!",
    });
  }
}
function deleteUserById(req, res) {
  let { id } = req.params;
  let filteredUsers = userDB.filter(function (user) {
    return user.id != id;
  });
  if (filteredUsers.length == userDB.length) {
    res.status(404).json({
      message: "User not found !!",
    });
  } else {
    fs.writeFileSync("../Model/usersModel.json", JSON.stringify(filteredUsers));
    res.status(200).json({
      message: "User deleted Successfully !!!",
    });
  }
}

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
