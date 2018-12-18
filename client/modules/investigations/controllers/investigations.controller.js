'use strict';

angular.module('investigations').controller('InvestigationsController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Investigations',
  function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog,  Investigations) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('investigations', function (){
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.investigation = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = () => {
      $scope.investigation = {};
      $scope.display.edit = true;
    };

    $scope.resetFilter = () => {
      var d=new Date(),
        year = d.getFullYear(),
        month = d.getMonth(),
        lastDate = new Date(year,month+1,0).getDate();

      $scope.filter = {
        slated : new Date(year,month,1),
        due : new Date(year,month,lastDate),
        limit: 20,
        page: 1
      };
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.filtering = () => {
      var query = {
        status:{ $ne : 'x' }
      };
      query.created = {};

      if($scope.getReactively('filter.slated'))
        query.created.$gte = $scope.getReactively('filter.slated');

      if($scope.getReactively('filter.due'))
        query.created.$lte = $scope.getReactively('filter.due');

      if($scope.getReactively('filter.name'))
        query.name = new RegExp($scope.filter.name,"i");

      if($scope.getReactively('filter.victim'))
        query.victim = $scope.getReactively('filter.victim');

      return query;
    };

    $scope.helpers({
      investigations : () => {
        var query = $scope.filtering();

        return Investigations.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      investigationsCount : () => {
        var query = $scope.filtering();

        return Investigations.find(query).count();
      },
      investigation : () => {
        return Investigations.findOne($scope.getReactively('display.id'));
      }
    });

    $scope.find = () => {
      delete $scope.id;
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.findOne = () => {
      $scope.display.id = $state.params.id;
    };

    $scope.create = (investigation) => {
      $meteor.call('investigations.insert', investigation);
      $state.go('investigations.list');
    };

    $scope.update = (investigation) => {
      $meteor.call('investigations.update', $scope.display.id, investigation);
      $state.go('investigations.list');
    };

    $scope.delete = (investigation) => {
      var confirm = $mdDialog.confirm()
        .title('Delete Investigation')
        .textContent('Are you sure you want to delete ' + investigation.nickname + ' report?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then( () => {
        $meteor.call('investigations.remove', investigation._id, function (res){

        });
    });
  };

  }
]);
