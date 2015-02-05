(function() {
  'use strict';

  var module = angular.module('bonitoFormatters', []);


  module.service('formatters', function() {

    /**
     * Generic function to transform between units.
     * Adapted from: https://gist.github.com/thomseddon/3511330
     */
    var transform = function(input, precision, units, multiplier) {
        input = parseFloat(input);
        if (isNaN(input) || !isFinite(input)) {
          return '-';
        }
        if (input === 0) {
          return '0';
        }
        var negativeSign = '';
        if (input < 0) {
          input = -input;
          negativeSign = '-';
        }
        if (typeof precision === 'undefined') {
          precision = 1;
        }
        if (input < 1.0) {
          return '<1' + units[0];
        }
        var number = Math.floor(Math.log(input) / Math.log(multiplier));

        if (number >= units.length) {
          return '-';
        }
        if (number === 0) {
          // no precision for simple units
          precision = 0;
        }

        return negativeSign + (input / Math.pow(multiplier, number)).toFixed(precision) + units[number];
    };


    return {
      transform: transform,
      formatDuration: function(input, precision) {
        return transform(input, precision, ['micro', 'ms', 's', 'm', 'h'], 1000);
      },
      formatNumber: function(input, precision) {
        return transform(input, precision, ['', 'k', 'M', 'G', 'T', 'P'], 1000);
      }
    };
  });

})();
