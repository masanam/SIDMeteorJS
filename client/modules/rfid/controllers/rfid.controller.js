'use strict';

angular.module('identity').controller('RfidController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog',
'Rfid', 'Employee', function ($scope, $reactive, $meteor, $state, $mdDialog,  Rfid, Employee) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('rfid', function (){
      return [ $scope.$root.getReactively('currentUser.currentTeam') ];
    });

    $scope.rfid = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.rfid = {};
      $scope.display.edit = true;
    };

    $scope.resetFilter = function () {
      $scope.filter = {
        limit: 20,
        page: 1
      };
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.filtering = function () {
      var query = {
        status:{ $ne : 'x' }
      };

      if($scope.getReactively('filter.q'))
        query.rfid = new RegExp($scope.filter.q,"i");

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      if($scope.getReactively('filter.employee'))
        query.employee = $scope.filter.employee;

      if($scope.getReactively('filter.visitor'))
        query.visitor = $scope.filter.visitor;

      return query;
    };

    $scope.helpers({
      rfids: () => {
        var query = $scope.filtering();
        return Rfid.find(query);
      },
      rfid : () => {
        return Rfid.findOne($scope.getReactively('display.id'));
      },
      rfidCount : () => {
        var query = $scope.filtering();
        return Rfid.find(query).count();
      }
    });

    $scope.find = function () {
      $scope.resetForm();
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.display.id = $state.params.id;
    };

    $scope.create = function (rfid) {
      $meteor
        .call('rfid.insert', rfid)
        .then((res) => {
          $state.go('rfid.list');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.update = function (rfid) {
      $meteor
        .call('rfid.update', $scope.display.id, rfid)
        .then((res) => {
          $state.go('rfid.list');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.delete = function (rfid) {
      var employee = Employee.name(rfid.employee);
      var confirm = $mdDialog.confirm()
        .title('Delete Rfid')
        .textContent('Are you sure you want to delete ' + employee.name + '?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm).then(() => {
        $meteor
          .call('rfid.remove', rfid._id)
          .then((res) => {

          }, (err) => {

          });
      });
    };
  }
]);
