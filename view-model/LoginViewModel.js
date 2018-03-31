var LoginViewModel = function(data) {
  this.username = ko.observable(data.username || '');
  this.password = ko.observable(data.password || '');
  this.email = ko.observable(data.email || '');
  this.platform = ko.observable(data.platform || '');
  this.platformOptions = ko.observableArray(['Admin', 'User']);
};
