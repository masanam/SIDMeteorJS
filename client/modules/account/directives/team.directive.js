'use strict';

angular.module('account').directive('team', function() {
  return {
    restrict: 'E',
    scope: {
      id: '='
    },
    controller: ['$scope', 'Teams', function ($scope, Teams){
      $scope.helpers({
        team : () => {
          return Teams.findOne($scope.getReactively('id'));
        },
      });
    }],
    templateUrl: '/client/modules/account/directives/team.directive.html'
  };
});
