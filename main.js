var http = require('http');
var url = require("url");
var httpContentRedirect = require('./content-redirect');
var firstVM = require('./ViewModel/FirstViewModel');

var vm = new firstVM('Planet', 'Earth');
var subscription = vm.fullName.subscribe(function(value) {
  console.log(value);
});

function onRequest(request, response){
  try{
    var pathName = url.parse(request.url).pathname
    console.log(pathName);
    httpContentRedirect.onRequestNavigate(response, pathName);
  }catch(err){
    console.log('ERROR: ' + err);
  }
}

var server = http.createServer(onRequest);
server.listen(8080);