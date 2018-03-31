var db = require('../db/db');

module.exports = function(routerSettings){
  var router = routerSettings.router;
  var urlencodedParser = routerSettings.urlencodedParser;

  router.get("/",function(req,res){
    res.render('login', { kovm: 'LoginViewModel', kodata: JSON.stringify({'username' : '', 'password' : '', 'platform': 'User'})})
  });

  router.post("/login", urlencodedParser, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var platform = req.body.platform;

    var result = false;
    var message = '';

    db.query('Select * from user where username = ?', username, function(err, users){
        if(!err){
          if(users.length > 0 && username == users[0].Username && password == users[0].Password){
            req.session.users = users[0];
            result = true;
          }else{
            message = 'Failed to login'
          }
        }else{
          message = 'System error'
        }

        var data = {'Result': result, 'Message': message}
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
        res.end();
    });
  });

  router.get("/register",function(req,res){
    res.render('register', { kovm: 'LoginViewModel', kodata: JSON.stringify({'username' : '', 'password' : '', 'platform': 'User'})})
  });

  router.post("/register", urlencodedParser, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    var result = false;
    var message = '';
    if(username == "Test" && password == "1234qwer"){
      result = true;
    }else{
      message = 'Failed to register'
    }
    var data = {'Result': result, 'Message': message}
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
    res.end();
  });
}
