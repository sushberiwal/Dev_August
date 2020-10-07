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

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports = connection;