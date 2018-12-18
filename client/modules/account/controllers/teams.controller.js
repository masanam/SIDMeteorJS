'use strict';

angular.module('account').controller('TeamsController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog', 'Teams', 'Industries', 'Privileges',
  function ($scope, $reactive, $meteor, $state, $mdDialog,  Teams, Industries, Privileges) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('teams');

    //$scope.team = {};
    $scope.filter = {};
    $scope.industries = Industries;

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
      $meteor
        .call('teams.insert', team)
        .then((res) => {
          $state.go('account.teams');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.update = function (team) {
      $meteor
        .call('teams.update', $scope.display.id, team)
        .then((res) => {
          $state.go('account.teams');
        }, (err) => {
          console.log(err);
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


  }
]);
