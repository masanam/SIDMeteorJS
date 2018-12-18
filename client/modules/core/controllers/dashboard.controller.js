'use strict';

angular.module('core').controller('dashboardController', ['$scope', '$rootScope',
  function ($scope,$rootScope) {
    $scope.labels = ["Absences", "Present"];
    $scope.data = [300, 500];
    $scope.options = {legend: {display: true}};
  }
]);
