'use strict';

angular.module('employees').directive('employeeAutocomplete', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      label: '=',
      required: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Employees', function ($scope, $rootScope, $reactive, Employees){
      $reactive(this).attach($scope);
      this.subscribe('employees', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });

      $scope.helpers({
        employees : () => {
          var query = {
            team: $rootScope.getReactively('currentUser.currentTeam')
          };

          if($scope.getReactively('q'))
            query.name = new RegExp($scope.q, "i") ;

          return Employees.find(query);
        },
      });
    }],
    templateUrl: '/client/modules/employees/directives/employee-autocomplete.directive.html'
  };
});
