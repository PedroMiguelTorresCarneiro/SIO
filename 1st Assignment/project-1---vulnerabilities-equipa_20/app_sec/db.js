var mysql = require('mysql');
let dbConfig = require('../db_connection_config.json');

var selectQuery = "SELECT ?? FROM ??";
var loginQuery = "SELECT ?? FROM ?? WHERE user = ? AND password = MD5(?)";
var selectWhereQuery = "SELECT * FROM ?? WHERE ?? LIKE ?";
var selectWhereEqualQuery = "SELECT ?? FROM ?? WHERE ?? = ?";
var insertQuery = "INSERT INTO ?? SET ?";
var updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";

var connection = mysql.createConnection(dbConfig);



var login = function(user,callback){
  var res = {};
  var sql = mysql.format(loginQuery,['user','User', user.username, user.password]);

  var query = connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      
      res.message = (results.length == 1) ? "Login Successful" : "Login Failed: Wrong Username/Password combination";
      res.user = results[0];
      callback(res);
      return res;
    });
    console.log(query.sql);
}

var registerUser = function(user,callback){
    var sql = mysql.format(insertQuery,['User',user]);

    var query = connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(results.affectedRows);
        return results.affectedRows;
      });
      console.log(query.sql);
}

var getBooks = function(callback){
    var sql = mysql.format(selectQuery,[['name','author','date'],'Book']);

    var query = connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(results);
        return results;
      });
      console.log(query.sql);
}
var getUser = function(name, callback){
  var sql = mysql.format(selectWhereEqualQuery,[['user','password'],'User','user',name]);

  var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
      callback(results);
      return results;
    });
    console.log(query.sql);
}

var updateUser = function(name, user, callback){
  var sql = mysql.format(updateQuery,['User','user',user.username,'user', name]);

  var query = connection.query(sql, function (error, results, fields) {
      if (error) callback(error);
      callback(results);
      return results;
    });
    console.log(query.sql);
}

var getBookByName = function(name,callback){
  var nameQuery = name + "%";
  console.log(nameQuery);
  var sql = mysql.format(selectWhereQuery,['Book','name',nameQuery]);

  var query = connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      callback(results);
      return results;
    });
    console.log(query.sql);
}

var insertBook = function(book,callback){
    var sql = mysql.format(insertQuery,['Book',book]);

    var query = connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        callback(results);
        return results;
      });
      console.log(query.sql);
}


module.exports = {login, registerUser, getBooks, getBookByName, insertBook, getUser,updateUser}

