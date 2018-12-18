'use strict';

angular.module('timesheets').controller('employeesModalController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog', 'Employees','employeesId',
  function ($scope, $reactive, $meteor, $state, $mdDialog, Employees, employeesId) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('employees');

    $scope.employees = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.employees = {};
      $scope.display.edit = true;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      employees : () => {
        return Employees.findOne({ employeesId:employeesId });
      }
    });

    //////////////////////
    //SPECIFIC FUNCTIONS//
    //////////////////////

    $scope.cancel = function() {
      $mdDialog.hide();
    };
  }
]);
