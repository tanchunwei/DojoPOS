const nonAuthenticationPage = ['/','/register', '/login'];

module.exports = function(routerSettings){
  var router = routerSettings.router;

  router.use(function (req,res,next) {
    console.log("/" + req.method);
    if(req.session.username == undefined && !(nonAuthenticationPage.includes(req.path) || req.path.startsWith("/viewmodel/"))){
      res.redirect('/');
    }else{
      next();
    }
  });
}
