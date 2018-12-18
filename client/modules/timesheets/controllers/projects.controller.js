'use strict';

angular.module('timesheets').controller('ProjectsController', ['$scope', '$rootScope', '$reactive', 'Projects',
  function ($scope, $rootScope, $reactive, Projects) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('projects', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.selected = [];


    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      projects:  () => {
        return Projects.find({});
      }
    });


    ////////////////////////////////
    // CONTEXT SPECIFIC FUNCTIONS //
    ////////////////////////////////

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };
  }
]);
