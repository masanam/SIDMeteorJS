'use strict';

angular.module('core').directive('arrayInput', function() {
  return {
    restrict: 'E',
    scope: {
      list: '=?',
      label: '='
    },
    controller: ['$scope', function ($scope){
      $scope.splice = function (idx){
        $scope.list.splice(idx, 1);
      };

      $scope.add = function (){
        if(!$scope.list) $scope.list = [];
        $scope.list.push('');
      };
    }],
    templateUrl: '/client/modules/core/directives/array-input.directive.html'
  };
});