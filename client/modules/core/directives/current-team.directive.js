'use strict';

angular.module('core').directive('currentTeam', function() {
  return {
    restrict: 'E',
    scope: {
      id: '=id'
    },
    controller: ['$scope', '$reactive', 'Teams', function ($scope, $reactive, Teams){
      $reactive(this).attach($scope);
      this.subscribe('teams');
    
      $scope.helpers({
        team: () => {
          return Teams.findOne($scope.getReactively('id'));
        },
      });
    }],
    templateUrl: '/client/modules/core/directives/current-team.directive.html'
  };
});