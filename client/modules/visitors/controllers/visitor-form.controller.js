'use strict';

angular.module('visitors').controller('VisitorFormController', ['$scope', '$rootScope', '$reactive', 'VisitorTypes', 'IdentityTypes',
  function ($scope, $rootScope, $reactive, VisitorTypes, IdentityTypes) {
    $reactive(this).attach($scope);

    $scope.select = {};

    $scope.init = () => {
      $scope.select.visitorTypes = VisitorTypes;
      $scope.select.identityTypes = IdentityTypes.visitor;
    };
  }
]);
