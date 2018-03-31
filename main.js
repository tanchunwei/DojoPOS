var db = require('./db/db');
var routeSettings = require('./routes/route-settings');
var app = routeSettings.app;
var router = routeSettings.router;

//var path = __dirname + '/views/';
require('./routes/global-route')(routeSettings);
require('./routes/account-route')(routeSettings);
require('./routes/user/item-route')(routeSettings);

//router.get("/index",function(req,res){
//  res.sendFile(path + "Main.html");
//});
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  }
})

var server = app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//var io = require('socket.io').listen(server);

//io.sockets.on('connection', function (socket) {
//  console.log("Socket IO Establish");
//});
