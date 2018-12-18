'use strict';

angular.module('investigations').controller('InvestigationFormController', ['$scope', '$rootScope', '$reactive', 'ReporterPosition',
  function ($scope, $rootScope, $reactive, ReporterPosition) {
    $reactive(this).attach($scope);

    $scope.select = {};

    $scope.listArray = () => {
      $scope.select.reporterPos = ReporterPosition;
    };
  }
]);
