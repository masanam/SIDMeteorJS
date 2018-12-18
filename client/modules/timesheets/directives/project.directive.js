'use strict';

angular.module('timesheets').directive('project', function() {
  return {
    restrict: 'E',
    scope: {
      id: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Projects', function ($scope, $rootScope, $reactive, Projects){
      $reactive(this).attach($scope);
      this.subscribe('project', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });

      $scope.helpers({
        project : () => {
          return Projects.findOne($scope.getReactively('id'));
        },
      });
    }],
    template: '<a>{{project.callsign}} <md-tooltip>{{ project.name }}</md-tooltip></a>'
  };
});
