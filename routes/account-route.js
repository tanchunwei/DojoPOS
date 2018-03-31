var db = require('../db/db');
var routeHelper = require('../helper/route-helper');
var validateHelper = require('../helper/validate-helper');

module.exports = function(routerSettings){
  var router = routerSettings.router;
  var urlencodedParser = routerSettings.urlencodedParser;

  router.get("/",function(req,res){
    res.render('login', { kovm: 'LoginViewModel', kodata: JSON.stringify({'username' : '', 'password' : '', 'email': '', 'platform': 'User'})})
  });

  router.post("/login", urlencodedParser, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var platform = req.body.platform;

    var result = false;
    var message = '';

    db.query('Select * from user where username = ?', username, function(err, users){
        if(users.length > 0 && username == users[0].Username && password == users[0].Password){
          req.session.users = users[0];
          req.session.platform = platform;
          result = true;
        }else{
          message = 'Failed to login'
        }

        var data = {'Result': result, 'Message': message}
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
        res.end();
    }, function(){routeHelper.RouteAjaxCommonError(res)});
  });

  router.get("/register",function(req,res){
    res.render('register', { kovm: 'LoginViewModel', kodata: JSON.stringify({'username' : '', 'password' : '','email': '', 'platform': 'User'})})
  });

  router.post("/register", urlencodedParser, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    var result = false;
    var message = '';

    if(validateHelper.IsEmailValid(email)){
      message += validateHelper.IsEmailValid(email) + "\n";
    }

    if(validateHelper.IsUsernameValid(username)){
      message += validateHelper.IsUsernameValid(username) + "\n";
    }

    if(validateHelper.IsPasswordValid(password)){
      message += validateHelper.IsPasswordValid(password) + "\n";
    }

    if(message != ''){
      var data = {'Result': result, 'Message': message}
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
      res.end();
      return;
    }

    db.query('Select * from user where Username = ? or Email = ?', [username, email], function(err, users){
      if(users.length > 0){
        message = 'Username or Email exist';
        routeHelper.RouteAjax(res, {'Result': result, 'Message': message});
      }else{
        db.query('Insert into user(UserId, Username, Password, Email) values (UUID(), ?, ?, ?)', [username, password, email], function(err, users){
          if(err){
            message = 'Failed to register'
          }else{
            result = true;
          }

          var data = {'Result': result, 'Message': message}
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(data));
          res.end();
        }, function(){routeHelper.RouteAjaxCommonError(res)});
      }
    }, function(){routeHelper.RouteAjaxCommonError(res)});
  });
}
