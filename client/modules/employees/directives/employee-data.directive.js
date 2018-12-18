'use strict';

angular.module('employees').directive('employeeData', function() {
  return {
    restrict: 'E',
    scope: {
      id: '=',
      field: '@'
    },

    controller: ['$scope', '$rootScope', '$reactive', 'Employees', function ($scope, $rootScope, $reactive, Employees){

      $reactive(this).attach($scope);
      this.subscribe('employees', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });



      $scope.helpers({
        employee : () => {
          return Employees.findOne($scope.getReactively('id'));
        },
        query : () => {
          return $scope.field;
        },


      });

    }],
    template: "{{employee[query]}}"
  };
});
