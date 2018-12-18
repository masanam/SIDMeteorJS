'use strict';

angular.module('roles').controller('rolesController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog', 'Roles',
  function ($scope, $reactive, $meteor, $state, $mdDialog,  Roles) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('roles');

    $scope.roles = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.roles = {};
      $scope.display.edit = true;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      roless: () => {
        return Roles.find({});
      },
      roles : () => {
        return Roles.findOne($scope.getReactively('id'));
      },
      rolesCount : () => {
        return Roles.find({}).count();
      }
    });

    $scope.find = function () {
      delete $scope.id;
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.id = $state.params.id;
    };

    $scope.create = function (roles) {
      $meteor.call('roles.insert', roles);
      $state.go('roles.list');
    };

    $scope.update = function (roles) {
      Roles.update($scope.id, roles, function (res){
        $state.go('roles.list');
      });
    };

    $scope.delete = function (roles) {
      var confirm = $mdDialog.confirm()
        .title('Delete Roles')
        .textContent('Are you sure you want to delete ' + roles.name + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor.call('roles.remove', roles._id, function (res){
        });
      });
    };

  }
]);
