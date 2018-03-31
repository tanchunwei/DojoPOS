exports.RouteAjax = function (res, data){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
  res.end();
}

exports.RouteAjaxCommonError = function (res){
  var data = {'Result': false, 'Message': 'System error'}
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
  res.end();
}
