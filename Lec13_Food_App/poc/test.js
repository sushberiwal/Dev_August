const crypto = require("crypto");

let token = crypto.randomBytes(32).toString("hex");

console.log(token);

console.log(   );