var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = 'dojopos'
  , TEST_DB = 'dojopos'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'P@ssword',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}

exports.query = function(sql, values, done) {
  var result;
  var pool = exports.get();
  pool.query(sql, values, result = function(err, result) {
    if (err) {
      console.log("[mysql error]",err);
      return done(err)
    }
    return done(null, result)
  })
  return result;
}
