(function() {
  'use strict';

  var module = angular.module('bonitoTimefilter', []);

  /**
   * Singleton service that holds the current time filter.
   */
  module.factory('timefilter', ['_', function(_) {
    var timeDefaults = {
      from: 'now-1h',
      to: 'now',
      mode: 'quick',
      display: 'Last hour'
    };

    var self = this;

    self.time = timeDefaults;

    return {
      time: self.time,
      set: function(options) {
        _.assign(self.time, options);
      }
    };
  }]);

})();