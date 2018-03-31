const nonAuthenticationPage = ['/','/register', '/login'];

module.exports = function(routerSettings){
  var router = routerSettings.router;

  router.use(function (req,res,next) {
    if(req.session.users)
      console.log("User["+req.session.users.UserId+"], Path:" +req.path);
    else
      console.log("User[Unknown], Path:" +req.path);

    if(req.session.users == undefined && !(nonAuthenticationPage.includes(req.path) || req.path.startsWith("/viewmodel/"))){
      res.redirect('/');
    }else{
      next();
    }
  });
}
