'use strict';

angular.module('violations').controller('ViolationsController', ['$scope', '$rootScope','$reactive', '$meteor', '$state', '$mdDialog', 'Violations', 'Employees',
  function ($scope, $rootScope,  $reactive, $meteor, $state, $mdDialog, Violations, Employees) {

    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('violations', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.violations = {};
    $scope.display = {};
    $scope.filter = {};


    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////

    $scope.resetForm = () => {
      $scope.violations = {};
      $scope.display.edit = true;
    };

    $scope.resetFilter = () => {
      $scope.filter = {
        limit: 20,
        page: 1
      };
    };

    ////////////////
    // BASIC CRUD //
    ////////////////

    $scope.filtering = () => {
      var query = {
        status:{ $ne : 'x' }
      };

      if($scope.getReactively('filter.name'))
        query.employee = $scope.getReactively('filter.name');

      if($scope.getReactively('filter.employeeId'))
        query.employeeId = new RegExp($scope.filter.employeeId,"i");

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };

    $scope.helpers({

      violations : () => {
        var query = $scope.filtering();

        return Violations.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },

      violationsCount : () => {
        var query = $scope.filtering();

        return Violations.find(query).count();
      },

      violation : () => {
        return Violations.findOne($scope.getReactively('display.id'));
      },

      violationHistory : () => {
        return Violations.find({employee:$state.params.employee});
      },
    });

    $scope.findOne = () => {
      $scope.display.id = $state.params.id;
      $scope.display.employee = $state.params.employee;
    };

    $scope.find = () => {
      $scope.resetForm();
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.findEmployee = () => {
      $scope.display.employee = $state.params.employee;
      $scope.currentState = $state.current.name;
    };


    $scope.create = function() {
      $scope.violation.employee = $state.params.employee;
      var confirm = $mdDialog.confirm()
        .title('Create Violation')
        .textContent('Are you sure you want to create violation for '+ Employees.findOne({_id:$state.params.employee}).name +'?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor
          .call('violations.insert', $scope.violation)
          .then((res) => {
            var conf = $mdDialog.alert()
              .title('Success')
              .textContent('Your report will send to HR')
              .ok('Ok')
              $mdDialog.show(conf).then(function() {
                $state.go('violations.history', ({ employee:$state.params.employee }));
            });
          }, (err) => {
            $scope.display.error = err;
          });

      });
    }


    $scope.resetForm = function() {
      $scope.violation = {};
    };
  }
]);
