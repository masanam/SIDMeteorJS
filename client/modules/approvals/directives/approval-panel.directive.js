'use strict';

angular.module('approvals').directive('approvalPanel', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      ref: '=',
      owner: '='
    },
    controller: ['$scope', '$rootScope', '$meteor', '$reactive', 'Approvals', function ($scope, $rootScope, $meteor, $reactive, Approvals){
      $reactive(this).attach($scope);
      this.subscribe('approvals', () => {
        return [ $scope.getReactively('model'), $scope.getReactively('ref') ];
      });

      $scope.helpers({
        approval : () => {
          return Approvals.findOne({
            model: $scope.getReactively('model'),
            ref: $scope.getReactively('ref'),
            approver: $rootScope.getReactively('currentEmployee._id')
          });
        },
      });

      $scope.respond = (approval, response) => {
        $meteor.call('approvals.respond', approval._id, response);
      };

      $scope.request = (model, ref) => {
        $meteor.call('approvals.request', model, ref);
      };
    }],
    templateUrl: '/client/modules/approvals/directives/approval-panel.directive.html'
  };
});