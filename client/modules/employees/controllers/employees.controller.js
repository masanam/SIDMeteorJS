'use strict';

angular.module('employees').controller('EmployeesController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Employees', 'IdentityTypes',
  function ($scope,$rootScope, $reactive, $meteor, $state, $mdDialog,  Employees, IdentityTypes) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('employees', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });


    $scope.identityTypes = IdentityTypes.employee;

    $scope.display = {};
    $scope.filter = {};


    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.employee = {};
    };

    $scope.resetFilter = function () {
      $scope.filter = {
        limit: 20,
        page: 1
      };
    };

    ////////////////
    // BASIC CRUD //
    ////////////////
    $scope.filtering = function () {
      var query = {
        status:{ $ne : 'x' }
      };

      query.team = $rootScope.getReactively('currentUser.currentTeam');

      if($scope.getReactively('filter.q'))
        query.name = new RegExp($scope.filter.q,"i");

      if($scope.getReactively('filter.gender'))
        query.gender = $scope.filter.gender;

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };
    $scope.helpers({

      employees : () => {
        var query = $scope.filtering();

        return Employees.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      employeesCount : () => {
        var query = $scope.filtering();

        return Employees.find(query).count();
      },
      employee : () => {
        return Employees.findOne($scope.getReactively('display.id'));
      },
      employeeType: ()=>{
        return ['Guest','Employee','Supplier/Expedition','Intern'];
      },
      identityType: ()=>{
        return ['KTP','SIM','Passport','KIMS/KITAS'];
      },
    });

    $scope.findOne = function () {
      $scope.display.id = $state.params.id;
    };

    $scope.find = function () {
      $scope.resetForm();
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.delete = function (employee) {
      var confirm = $mdDialog.confirm()
        .title('Delete Employees')
        .textContent('Are you sure you want to delete ' + employee.name + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor.call('employees.remove', employee._id);
      });
    };

    //////////////////////
    //SPECIFIC FUNCTIONS//
    //////////////////////


    $scope.cancel = function() {
      $mdDialog.hide();
    };

  }
]);
