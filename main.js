var routeSettings = require('./routes/route-settings');
var app = routeSettings.app;
var router = routeSettings.router;

//var path = __dirname + '/views/';
require('./routes/global-route')(routeSettings);
require('./routes/account-route')(routeSettings);

router.get("/index",function(req,res){
  res.render('index', { kovm: 'ItemDisplayViewModel', kodata: JSON.stringify({'items' : [{'name' : 'Food'}, {'name' : 'Drink'}]})})
});

router.get("/processIndex",function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{'name' : 'Dessert'}, {'name' : 'Beer'}]));
  res.end();
});

//router.get("/index",function(req,res){
//  res.sendFile(path + "Main.html");
//});

var server = app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//var io = require('socket.io').listen(server);

//io.sockets.on('connection', function (socket) {
//  console.log("Socket IO Establish");
//});
