'use strict';

angular.module('finance').controller('FinanceController', ['$scope', '$reactive', '$meteor', '$state', 'Transactions',
  function ($scope, $reactive, $meteor, $state, Transactions) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('transactions');

    $scope.transaction = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.transaction = {};
      $scope.display.edit = true;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      transactions: () => {
        return Transactions.find({});
      },
      transaction : () => {
        return Transactions.findOne($scope.getReactively('id'));
      },
      transactionsCount : () => {
        return Transactions.find({}).count();
      }
    });

    $scope.find = function () {
      delete $scope.id;
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.id = $state.params.id;
    };

    $scope.create = function (transaction) {
      $meteor.call('transactions.insert', transaction, function (res){
        $state.go('transactions.list');
      });
    };

    $scope.update = function (transaction) {
      Transactions.update($scope.id, transaction, function (res){
        $state.go('transactions.list');
      });
    };

  }
]);
