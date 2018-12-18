'use strict';

angular.module('audits').controller('AuditFormController', ['$scope', '$rootScope', '$reactive', 'AuditFindings', 'AuditLocation', 'AuditCategory',
  function ($scope, $rootScope, $reactive, AuditFindings, AuditLocation, AuditCategory) {
    $reactive(this).attach($scope);

    $scope.select = {};

    $scope.listArray = () => {
      $scope.select.auditFindings = AuditFindings;
      $scope.select.auditLocation = AuditLocation;
      $scope.select.auditCategory = AuditCategory;
    };
  }
]);
