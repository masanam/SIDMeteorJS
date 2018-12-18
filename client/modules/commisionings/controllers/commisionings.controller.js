'use strict';

angular.module('commisionings').controller('CommisioningsController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Commisionings', 'DocumentType',
  function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog,  Commisionings, DocumentType) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('commisionings', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.display = {};
    $scope.filter = {};
    $scope.selected = [];

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm =  () => {
      $scope.display.edit = true;
    };

    $scope.resetFilter = () => {
      $scope.filter = {
        asset: $state.params.asset,
        limit: 20,
        page: 1
      };
    };

    ///////////////////
    // BASIC CRUD    //
    ///////////////////

    $scope.filtering = () => {
      var query = {
        status:{ $ne : 'x' }
      };

      if($scope.getReactively('filter.creator'))
        query.creator = $scope.filter.creator;
        
      if($scope.getReactively('filter.asset'))
        query.asset = $scope.filter.asset;

      if($state.params.asset) query.asset = $state.params.asset;

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      if($scope.getReactively('filter.q'))
        query.inspector = new RegExp($scope.filter.q,"i");

      if($scope.getReactively('filter.accessarea'))
        query.accessarea = new RegExp($scope.filter.accessarea,"i");

      return query;
    };

    $scope.helpers({
      commisionings : () => {
        var query = $scope.filtering();

      return Commisionings.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      commisioning : () => {
      return Commisionings.findOne($scope.getReactively('display.id'));
      },
      commisioningsCount: () => {
        var query = $scope.filtering();

        return Commisionings.find({}).count();
      }
    });

    $scope.find = () => {
      delete $scope.display.id;
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.findOne =  (id) => {
      if(id) {
        $scope.display.id = id;
      }
      else {
        $scope.display.id = $state.params.id;
        $scope.display.asset = $state.params.asset;
        $scope.assetType = DocumentType.assetId($state.params.asset);
      }

    };

    $scope.create = (commisioning) => {
      $scope.commisioning.asset = $state.params.asset;
      $meteor
        .call('commisionings.insert', commisioning)
        .then((res) => {
          $state.go('commisionings.list',{ asset: $state.params.asset });
        }, (err) => {

        });
    };

    $scope.update = (commisionings) => {
      $meteor
        .call('commisionings.update', $scope.display.id,commisionings)
        .then((res) => {
          $state.go('commisionings.list',({asset: $scope.commisioning.asset }));
        }, (err) => {

        });
      };

    $scope.delete = (commisioning) => {
      var confirm = $mdDialog.confirm()
        .title('Delete Commisionings')
        .textContent('Are you sure you want to delete this commisioning ?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(() => {

        $meteor.call('commisionings.remove', commisioning._id,  (res) => {
        });
      });
    };

  }
]);
