'use strict';

angular.module('hazards').controller('hazardsController', ['$scope', '$rootScope','$reactive', '$meteor', '$state', '$mdDialog', 'Hazards',
  function ($scope,$rootScope,$reactive, $meteor, $state, $mdDialog,  Hazards) {

    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('hazards', function (){
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.hazard = {};
    $scope.display = {};
    $scope.filter = {};
    $scope.filter.type = false;


    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = () => {
      $scope.hazard = {};
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
        status:{ $ne : 'x' },
        type: 'f'
      };

      if($scope.getReactively('filter.type'))
        query.type = 'g';

      if($scope.getReactively('filter.date'))
        query.date = $scope.filter.date;

      if($scope.getReactively('filter.danger'))
        query.danger = new RegExp($scope.filter.danger,"i");

      if($scope.getReactively('filter.violator'))
        query.violator = new RegExp($scope.filter.violator,"i");

      if($scope.getReactively('filter.violation'))
        query.desc = new RegExp($scope.filter.violation,"i");

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };
    $scope.helpers({

      hazards : () => {
        var query = $scope.filtering();

        return Hazards.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },

      hazardsCount : () => {
        var query = $scope.filtering();

        return Hazards.find(query).count();
      },

      hazard : () => {
        return Hazards.findOne($scope.getReactively('display.id'));
      },

    });

    $scope.findOne = () => {
      $scope.display.id= $state.params.id;
    };

    $scope.find = () => {
      $scope.resetForm();
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.create = (hazard, type) => {
      $meteor
        .call('hazards.insert', hazard)
        .then((res) => {
          $state.go('hazards.list');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.update = (id, hazard) => {
      $meteor
        .call('hazards.update', $scope.display.id, hazard)
        .then((res) => {
          $state.go('hazards.list');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.delete = (hazard) => {
      var confirm = $mdDialog.confirm()
        .title('Delete Hazard')
        .textContent('Are you sure you want to delete ' + hazard.danger + '?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm).then(function() {
        $meteor
          .call('hazards.remove', hazard._id)
          .then((res) => {
            $state.go('hazards.list');
          }, (err) => {
            console.log(err);
          });
      });
    };

  }
]);
