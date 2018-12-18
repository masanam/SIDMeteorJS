'use strict';

angular.module('account').directive('users', function() {
  return {
    restrict: 'E',
    scope: {
      id: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', function ($scope, $rootScope, $reactive){
      $reactive(this).attach($scope);
      //this.subscribe('allUsers');
      $scope.helpers({
        user : () => {
          return Meteor.users.findOne($scope.getReactively('id'));

        },
      });
    }],
    templateUrl: '/client/modules/account/directives/user.directive.html'
  };
});
