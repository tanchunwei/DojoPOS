var LoginViewModel = function(data) {
  this.username = ko.observable(data.username || '');
  this.password = ko.observable(data.password || '');
  this.platform = ko.observable(data.platform || '');
  this.platformOptions = ko.observableArray(['Admin', 'User']);
};
