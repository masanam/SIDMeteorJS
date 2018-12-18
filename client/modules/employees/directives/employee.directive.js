'use strict';

angular.module('employees').directive('employee', function() {
  return {
    restrict: 'E',
    scope: {
      id: '='
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
      });
    }],
    templateUrl: '/client/modules/employees/directives/employee.directive.html'
  };
});
