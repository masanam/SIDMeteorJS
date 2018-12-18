'use strict';

angular.module('visitors').directive('visitorAutocomplete', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      label: '=',
      required: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Visitors', function ($scope, $rootScope, $reactive, Visitors){
      $reactive(this).attach($scope);
      this.subscribe('visitors', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });

      $scope.helpers({
        visitors : () => {
          var query = {
            team: $rootScope.getReactively('currentUser.currentTeam')
          };

          if($scope.getReactively('q')) query.name = new RegExp($scope.q, "i");

          return Visitors.find(query);
        },
      });
    }],
    templateUrl: '/client/modules/visitors/directives/visitor-autocomplete.directive.html'
  };
});
