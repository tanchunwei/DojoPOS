module.exports = function(routerSettings){
  var router = routerSettings.router;

  router.get("/index",function(req,res){
    res.render('index', { kovm: 'ItemDisplayViewModel', kodata: JSON.stringify({'items' : [{'name' : 'Food'}, {'name' : 'Drink'}]})})
  });

  router.get("/processIndex",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([{'name' : 'Dessert'}, {'name' : 'Beer'}]));
    res.end();
  });
}
