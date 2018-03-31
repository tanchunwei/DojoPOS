exports.IsEmailValid = function (val){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(val).toLowerCase())){
      return null;
    }else{
      return "Email invalid";
    }
}

exports.IsUsernameValid = function (val){
    return val.length < 6 ? "Username minimium 6 character" : null ;
}

exports.IsPasswordValid = function (val){
    return val.length < 6 ? "Password minimium 6 character" : null ;
}
