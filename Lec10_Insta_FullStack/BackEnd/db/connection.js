// npm install mysql

// To connect app.js to cloud database

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'b3xmvrmiseqzgqpznlrf-mysql.services.clever-cloud.com',
  user     : 'uvzotvernlhrhpc7',
  password : 'zOslnmjMRejgwGisY6eT',
  database : 'b3xmvrmiseqzgqpznlrf'
});

 
connection.connect();
 
console.log("Connected succesfully !!");


setInterval(function () {
  connection.query('SELECT 1');
}, 5000);

module.exports = connection;