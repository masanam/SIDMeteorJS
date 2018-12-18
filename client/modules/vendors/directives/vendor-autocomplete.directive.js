'use strict';

angular.module('vendors').directive('vendorAutocomplete', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      label: '=',
      required: '='
    },
    controller: ['$scope', '$rootScope', '$reactive', 'Vendors', function ($scope, $rootScope, $reactive, Vendors){
      $reactive(this).attach($scope);
      this.subscribe('vendors', () => {
        return [ $rootScope.getReactively('currentUser.currentTeam') ];
      });

      $scope.helpers({
        vendors : () => {
          var query = {};
          if($scope.getReactively('q')) query.legalName = new RegExp($scope.getReactively('q'), 'i');

          return Vendors.find(query);
        },
      });
    }],
    templateUrl: '/client/modules/vendors/directives/vendor-autocomplete.directive.html'
  };
});
