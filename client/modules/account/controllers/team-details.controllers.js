'use strict';

angular.module('account').controller('TeamDetailsController', ['$scope', 'Industries',
  function ($scope, Industries) {
    $scope.industries = Industries;
  }
]);