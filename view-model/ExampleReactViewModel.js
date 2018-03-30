var ko = require('../node_modules/knockout/build/output/knockout-latest.debug.js');

var ItemViewModel = function(item) {
  this.item = ko.observable(item || '');
};

module.exports = ItemViewModel;