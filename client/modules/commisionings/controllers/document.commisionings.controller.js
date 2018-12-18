'use strict';

angular.module('commisionings').controller('DocumentCommisioningsController', ['$scope',
  function ($scope) {
    $scope.selected = [];
    $scope.items = [
      'A',  'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J'
    ];
  }
]);
