/*jshint -W079 */
var db = require('../sql-db/index.js');
var Promise = require('bluebird');

module.exports = {
  user: {
    get: function (id) {
      return new Promise( function (resolve, reject) {
        var query;
        if (id) {
          query = 'SELECT * FROM users \
                      WHERE id = ' + id;
        } else {
          query = 'SELECT * FROM users';
        }

        db.con.query(query, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },
    getByUsername: function (username) {
      return new Promise( function (resolve, reject) {
        db.con.query('SELECT * FROM users \
                                 WHERE username = ?', username, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },
    post: function (user) {
      return new Promise(function (resolve, reject) {
        db.con.query('INSERT into users set ?', user, function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },
    put: function (userId, user) {
      return new Promise(function (resolve, reject) {
        db.con.query('UPDATE users SET ? WHERE id = ?', [user, userId], function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  }
};
