'use strict';

angular.module('timesheets').controller('TimesheetsController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdSidenav', '$mdDialog', 'Tasks', 'TaskStatus',
  function ($scope, $rootScope, $reactive, $meteor, $state, $mdSidenav, $mdDialog, Tasks, TaskStatus) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('tasks', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

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


    ////////////////////////////////
    // CONTEXT SPECIFIC FUNCTIONS //
    ////////////////////////////////

    $scope.toggleTray = function (navID){
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    };

    $scope.add = function(ev) {
      $mdDialog.show({
        controller: 'CreateTasksController',
        templateUrl: '/client/modules/timesheets/views/+create.modal.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      })
      .then(function(task) {
        $meteor.call('tasks.insert', task, function (res){
          $state.go('tasks.list');
        });
      }, function() {
        console.log('Cancelled create new Task');
      });
    };

  }
]);
