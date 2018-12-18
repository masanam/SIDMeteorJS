'use strict';

angular.module('teams').controller('TeamsController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog', 'Teams', 'Industries', 'Privileges',
  function ($scope, $reactive, $meteor, $state, $mdDialog,  Teams, Industries, Privileges) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('teams');

    $scope.team = {};
    $scope.display = {};
    $scope.filter = {};
    $scope.industries = Industries;
    $scope.privileges = Privileges;

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.team = {};
      $scope.display.edit = true;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      teams: () => {
        return Teams.find({});
      },
      team : () => {
        return Teams.findOne($scope.getReactively('display.id'));
      },
      teamsCount : () => {
        return Teams.find({}).count();
      }
    });

    $scope.find = function () {
      delete $scope.display.id;
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.display.id = $state.params.id || $state.params.teamId;
    };

    $scope.create = function (team) {
      $meteor.call('teams.insert', team);
      $state.go('teams.list');
    };

    $scope.update = function (team) {
      Teams.update($scope.display.id, team, function (res){
        $state.go('teams.list');
      });
    };

    $scope.delete = function (team) {
      var confirm = $mdDialog.confirm()
        .title('Delete Teams')
        .textContent('Are you sure you want to delete ' + team.name + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor.call('teams.remove', team._id, function (res){
        });
      });
    };

    //////////////////////
    // CONTEXT-SPECIFIC //
    //////////////////////

    $scope.toggle = function (item, role) {
      if(!role.privileges) role.privileges = [];

      var idx = role.privileges.indexOf(item);
      if (idx > -1) {
        role.privileges.splice(idx, 1);
      }
      else {
        role.privileges.push(item);
      }
    };

    $scope.exists = function (item, list) {
      if(!list) list = [];
      return list.indexOf(item) > -1;
    };

  }
]);
