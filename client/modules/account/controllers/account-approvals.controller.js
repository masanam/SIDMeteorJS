'use strict';

angular.module('account').controller('AccountApprovalsController', ['$scope', '$mdDialog', 'ApprovalSchemes',
  function ($scope, $mdDialog, ApprovalSchemes) {
    $scope.aSchemes = ApprovalSchemes.schemes;
    $scope.aTypes = ApprovalSchemes.types;


    $scope.addSequence = function (title) {
      if(!$scope.team.approvalSchemes)
        $scope.team.approvalSchemes = {};

      if(!$scope.team.approvalSchemes[title])
        $scope.team.approvalSchemes[title] = {};

      if(!$scope.team.approvalSchemes[title].sequences)
        $scope.team.approvalSchemes[title].sequences = [];

      $scope.team.approvalSchemes[title].sequences.push({});
    };


    $scope.deleteSequence = function (title, idx) {
      $scope.team.approvalSchemes[title].sequences.splice(idx, 1);
    };
  }
]);
