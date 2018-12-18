'use strict';

angular.module('identity').directive('rfid', function() {
  return {
    restrict: 'E',
    scope: {
      employee: '=employee',
      visitor: '=visitor'
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Rfid', function ($scope, $rootScope, $reactive, Rfid){
      $reactive(this).attach($scope);
      this.subscribe('rfid', function (){
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });
    
      $scope.helpers({
        rfid: () => {
          var query = {};

          if($scope.getReactively('employee')) query.employee = $scope.employee;
          else if($scope.getReactively('visitor')) query.visitor = $scope.visitor;
          else query.employee = false;

          return Rfid.find(query, { sort: { status: 1, due: -1 } });
        },
      });
    }],
    templateUrl: '/client/modules/rfid/directives/rfid.directive.html'
  };
});