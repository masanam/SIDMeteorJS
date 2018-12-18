'use strict';

angular.module('account').directive('userAutocomplete', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      obj: '=',
      label: '=',
      required: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', function ($scope, $rootScope, $reactive){
      $reactive(this).attach($scope);
      this.subscribe('allUsers');
      $scope.helpers({
        users : () => {

          var query = {};

          if($scope.getReactively('q')) {
            query.username = new RegExp($scope.q, "i");
          }

          return Meteor.users.find(query);
        },
      });
    }],
    templateUrl: '/client/modules/account/directives/user-autocomplete.directive.html'
  };
});
