'use strict';

angular.module('timesheets').controller('TimesheetsController', ['$scope', '$reactive', '$meteor', '$state', 'Tasks', 'TaskStatus',
  function ($scope, $reactive, $meteor, $state, Tasks, TaskStatus) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('tasks');

    $scope.task = {};
    $scope.display = {};
    $scope.filter = {};
    $scope.taskStatus = TaskStatus;

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.task = {};
      $scope.display.edit = true;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      tasks: () => {
        return Tasks.find({});
      },
      task : () => {
        return Tasks.findOne($scope.getReactively('id'));
      },
      tasksCount : () => {
        return Tasks.find({}).count();
      }
    });

    $scope.find = function () {
      delete $scope.id;
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.id = $state.params.id;
    };

    $scope.create = function (task) {
      $meteor.call('tasks.insert', task, function (res){
        $state.go('tasks.list');
      });
    };

    $scope.update = function (task) {
      task.update($scope.id, task, function (res){
        $state.go('tasks.list');
      });
    };

    $scope.onDrop = function (status, task, index) {
      task.status = status;
      $meteor.call('tasks.update', task, function (err, res){
        console.log('updated!', err, res);
      });
    };

  }
]);
