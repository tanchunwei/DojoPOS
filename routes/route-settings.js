var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
const uuidv1 = require('uuid/v1');

var routeSettings = function() {
  this.app = express();
  this.router = express.Router();
  this.jsonParser = bodyParser.json();
  this.urlencodedParser = bodyParser.urlencoded({ extended: false });

  var sess = {
    secret: 'ICETURTLE',
    genid: function(req) {
      return uuidv1(); // use UUIDs for session IDs
    },
    cookie: {
      maxAge: 60000
    }
  }
  if (this.app.get('env') === 'production') {
    this.app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  this.app.use(session(sess))

  this.app.use("/",this.router);
  this.app.use("/viewmodel", express.static( __dirname + '/../view-model'));
  this.app.use(bodyParser.json({ type: 'application/*+json' }));
  this.app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
  this.app.use(bodyParser.text({ type: 'text/html' }));
  this.app.use(express.json());
  this.app.use(express.urlencoded());
  //app.use(express.multipart());

  this.app.use("*",function(req,res){
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.write('404 Page not found');
    res.end();
  });

  this.app.set('view engine', 'pug');

  return this;
};

module.exports = new routeSettings();
