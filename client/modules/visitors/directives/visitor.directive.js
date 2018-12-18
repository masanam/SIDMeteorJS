'use strict';

angular.module('visitors').directive('visitor', function() {
  return {
    restrict: 'E',
    scope: {
      id: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Visitors', function ($scope, $rootScope, $reactive, Visitors){
      $reactive(this).attach($scope);
      this.subscribe('visitors', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });


      $scope.helpers({
        visitor:() => {
          return Visitors.findOne($scope.getReactively('id'));
        },
      });
    }],
    templateUrl: '/client/modules/visitors/directives/visitor.directive.html'
  };
});
