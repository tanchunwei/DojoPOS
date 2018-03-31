var db = require('../../db/db');
var routeHelper = require('../../helper/route-helper');

module.exports = function(routerSettings){
  var router = routerSettings.router;
  var colorHsl = ['200','300','100','0','30'];

  router.get("/user/index",function(req,res){
    var data = [];
    db.query('Select * from item_category where userId = ? order by priority', req.session.users.UserId, function(err, categories){
        data = categories;
        db.query('Select * from item where CategoryId in (select CategoryId from item_category where userId = ?) order by priority', req.session.users.UserId, function(err, items){
            data.forEach(function(category, index){
              category.Items = [];
              category.Color = colorHsl[index % colorHsl.length];
              items.forEach(function(item){
                if(category.CategoryId == item.CategoryId){
                  category.Items.push(item);
                }
              });
            });
            res.render('user/index', { kovm: 'ItemDisplayViewModel', kodata: JSON.stringify(data)})
        }, function(){routeHelper.RouteAjaxCommonError(res)});
    }, function(){routeHelper.RouteAjaxCommonError(res)});
  });

  router.get("/processIndex",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([{'name' : 'Dessert'}, {'name' : 'Beer'}]));
    res.end();
  });
}
