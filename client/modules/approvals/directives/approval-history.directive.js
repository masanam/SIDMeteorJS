'use strict';

angular.module('approvals').directive('approvalHistory', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      ref: '='
    },
    controller: ['$scope', '$reactive', 'Approvals', 'ApprovalHistories', function ($scope, $reactive, Approvals, ApprovalHistories){
      $reactive(this).attach($scope);
      this.subscribe('approvals', () => {
        return [ $scope.getReactively('model'), $scope.getReactively('ref') ];
      });
      this.subscribe('approvalhistories', () => {
        return [ $scope.getReactively('model'), $scope.getReactively('ref') ];
      });

      $scope.display = {};
      
      $scope.helpers({
        approvals : () => {
          var query = {
            model: $scope.getReactively('model'),
            ref: $scope.getReactively('ref')
          };

          if(!$scope.getReactively('display.auto'))
            query.$nor = [
              { approval: 'y' },
              { approval: 'n' }
            ];

          return Approvals.find(query);
        },
        approvalHistories : () => {
          return ApprovalHistories.find({
            model: $scope.getReactively('model'),
            ref: $scope.getReactively('ref')
          });
        }
      });
    }],
    templateUrl: '/client/modules/approvals/directives/approval-history.directive.html'
  };
});