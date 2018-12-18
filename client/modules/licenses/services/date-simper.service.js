'use strict';

angular.module('licenses').factory('DateSimper', ['$state', function($state) {

  var datesim = {};

  datesim.dateUntil = (dateUntil) => {
    datesim.due = dateUntil;
  }

  return datesim;

}
]);
