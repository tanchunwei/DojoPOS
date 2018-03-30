var ItemDisplayViewModel = function(data) {
  this.items = ko.observable(data.items || '');
};
