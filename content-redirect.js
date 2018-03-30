var fs = require('fs'); 
var basePath = 'View/';
var contentMap = {
 '/': 'Main.html',
 '/contact' : 'Contact.html',
 '/error' : 'Error.html'
}

function onRequestNavigate(response, pathName){
    response.writeHead(200, {'Content-Type': 'text/html'});
    try{
    	response.write(fs.readFileSync(basePath + contentMap[pathName]));
    }catch(err){
        console.log('Error ' + err);
        response.writeHead(404, {'Content-Type': 'text/html'})
        response.write('404 Page not found');
    }finally{
        response.end();
    }
    
    //fs.readFile(basePath + contentMap[pathName], function(err, data) {
    //  if(err){
    //    console.log('Error: ' + err);
    //    response.end();
    //   }
    //response.write(data);
    //response.end();
    //});
}

function readFile(path){

}

exports.onRequestNavigate = onRequestNavigate;