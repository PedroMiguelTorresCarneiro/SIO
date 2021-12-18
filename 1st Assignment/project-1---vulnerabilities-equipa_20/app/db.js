var mysql = require('mysql');
let dbConfig = require('../db_connection_config.json');


var connection = mysql.createConnection(dbConfig);


 var ValidateUser = function(username, callback) {
  var sql = "SELECT user FROM User WHERE user = '" + username +
     "'";
    var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
        callback(results.length);
        return results.length;
      });
      console.log(query.sql);
}
var ValidatePassword = function(username,password, callback) {
  var sql = "SELECT * FROM User WHERE user = '" + username +
  "' AND PASSWORD = MD5('"+ password +"')";
    var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
        callback(results[0]);
        return results[0];
      });
      console.log(query.sql);
}

var login = function(user, callback){
  var res = {};
  res.user = {};
  ValidateUser(user.username, function result(data) {
      if(data == 1)
      {
        ValidatePassword(user.username,user.password, function result(data2) {
          if(data2 != undefined)
          {
            res.message = "Login Successful";
            res.user = data2;
            callback(res);
            //return "Login Successful";
          }
          else
          {
            res.message = "Login Failed: Wrong password";
            callback(res);
            //return "Login Failed: Wrong password";
          }
        });
      }
      else
      {
        res.message = "Login Failed: Unknown user";
        callback(res);
        //return "Login Failed: Unknown user";
      }
      
      return res;
      
  });
  
  
  
    
}

var registerUser = function(user,callback){
    var sql = "INSERT INTO User (user,password) VALUES('"
    + user.username + 
    "', MD5('" + user.password+ " '))";
    var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
        callback(results.affectedRows);
        return results.affectedRows;
      });
      console.log(query.sql);
}

var getBooks = function(callback){
    var sql = "SELECT name,author,date FROM Book";
    console.log(sql);
    var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
        callback(results);
        return results;
      });
      console.log(query.sql);
    
}

var getBookByName = function(name, callback){
    var sql = "SELECT name,author,date FROM Book WHERE name LIKE '" + name + "%'";
  
    var query = connection.query(sql, function (error, results, fields) {
        if (error) callback(error);
        callback(results);
        return results;
      });
      console.log(query.sql);
}

var getUser = function(name, callback){
  var sql = "SELECT * FROM User WHERE user = '" + name + "'";

  var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
      callback(results);
      return results;
    });
    console.log(query.sql);
}

var updateUser = function(name, user, callback){
  var sql = "UPDATE User SET user = '" + user.username + "' WHERE user = '" + name + "'";

  var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
      callback(results);
      return results;
    });
    console.log(query.sql);
}

var insertBook = function(book,callback){
    var sql = "INSERT INTO Book (name,author, date) VALUES('"
    + book.name + "','"
    + book.author + "', '"
    + book.date + "')";
    var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
        callback(results);
        return results;
      });
      console.log(query.sql);
}


module.exports = {login, registerUser, getBooks, getBookByName, insertBook, getUser,updateUser}