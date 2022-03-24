require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createPool({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "bd8409b2b9cdab",
  password: "a0495e69",
  database: "heroku_e635513b8596262",
});
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

module.exports = connection;
