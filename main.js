var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
var app = express();
var sess = {
  secret: 'ICETURTLE',
  genid: function(req) {
    return uuidv1(); // use UUIDs for session IDs
  },
  cookie: {
    maxAge: 60000
  }
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

var router = express.Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var path = __dirname + '/views/';

var nonAuthenticationPage = ['/','/register', '/login'];
router.use(function (req,res,next) {
  console.log("/" + req.method);
  if(req.session.username == undefined && !(nonAuthenticationPage.includes(req.path) || req.path.startsWith("/viewmodel/"))){
    res.redirect('/');
  }else{
    next();
  }
});

router.get("/",function(req,res){
  res.render('login', { kovm: 'LoginViewModel', kodata: JSON.stringify({'username' : '', 'password' : '', 'platform': 'User'})})
});

router.post("/login", urlencodedParser, function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var platform = req.body.platform;

  var result = false;
  var message = '';
  if(username == "Test" && password == "1234qwer"){
    req.session.username = username;
    req.session.platform = platform;
    result = true;
  }else{
    message = 'Failed to register'
  }
  var data = {'Result': result, 'Message': message}
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
  res.end();
});

router.get("/index",function(req,res){
  res.render('index', { kovm: 'ItemDisplayViewModel', kodata: JSON.stringify({'items' : [{'name' : 'Food'}, {'name' : 'Drink'}]})})
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

router.get("/processIndex",function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{'name' : 'Dessert'}, {'name' : 'Beer'}]));
  res.end();
});

//router.get("/index",function(req,res){
//  res.sendFile(path + "Main.html");
//});
app.use("/",router);
app.use("/viewmodel", express.static(__dirname + '/view-model'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.multipart());

app.use("*",function(req,res){
  res.writeHead(404, {'Content-Type': 'text/html'})
  res.write('404 Page not found');
  res.end();
});

app.set('view engine', 'pug');
var server = app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//var io = require('socket.io').listen(server);

//io.sockets.on('connection', function (socket) {
//  console.log("Socket IO Establish");
//});
