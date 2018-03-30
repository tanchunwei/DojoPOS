var express = require("express");
var app = express();
var router = express.Router();
//var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.render('index', { kovm: 'ItemDisplayViewModel', kodata: JSON.stringify({'items' : [{'name' : 'Food'}, {'name' : 'Drink'}]})})
});

router.get("/index",function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{'name' : 'Dessert'}, {'name' : 'Beer'}]));
  res.end();
});

//router.get("/index",function(req,res){
//  res.sendFile(path + "Main.html");
//});
app.use("/",router);
app.use("/viewmodel", express.static(__dirname + '/view-model'));

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