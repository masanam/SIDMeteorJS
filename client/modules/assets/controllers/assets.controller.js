'use strict';

angular.module('assets').controller('assetsController', ['$scope', '$reactive', '$meteor', '$state', '$mdDialog', 'Assets',
  function ($scope, $reactive, $meteor, $state, $mdDialog,  Assets ) {

        ////////////////////
        // INITIAL VALUES //
        ////////////////////

        $reactive(this).attach($scope);
        this.subscribe('assets');

        $scope.asset = {};
        $scope.display = {};
        $scope.filter = {};

        ////////////////////
        // FORM FUNCTIONS //
        ////////////////////
        $scope.resetForm = () => {
          $scope.asset = {};
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
            status:{ $ne : 'x' }
          };

          if($scope.getReactively('filter.creator'))
            query.creator = $scope.filter.creator;

          if($scope.getReactively('filter.q'))
            query.name = new RegExp($scope.filter.q,"i");

          if($scope.getReactively('filter.type'))
            query.type = $scope.filter.type;

          return query;
        };
        $scope.helpers({

          assets : () => {
            var query = $scope.filtering();

            return Assets.find(query, {
              limit: $scope.getReactively('filter.limit'),
              skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
            });
          },
          assetsCount : () => {
            var query = $scope.filtering();

            return Assets.find(query).count();
          },
          asset : () => {
            return Assets.findOne($scope.getReactively('display.id'));
          },

          industryTypes: ()=>{
            return ['Lands','Vehicle','Tools','Uniform'];
          },
        });

        $scope.findOne = () => {
          $scope.display.id = $state.params.id;
        };

        $scope.find = () => {
          $scope.resetForm();
          $scope.resetFilter();
          $scope.display.edit = false;
        };

        $scope.create = (assets) => {
          assets.asset = $state.params.asset;
          $meteor
            .call('assets.insert', assets)
            .then((res) => {
              $state.go('assets.list',{ asset: $state.params.asset });
            }, (err) => {
            });
        };

        $scope.update = (id, assets) => {
          $meteor
            .call('assets.update', $scope.display.id,assets)
            .then((res) => {
              $state.go('assets.list');
            }, (err) => {

            });
          };

        $scope.delete = (asset) => {
          var confirm = $mdDialog.confirm()
            .title('Delete Asset')
            .textContent('Are you sure you want to delete ' + asset.name + '?')
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirm).then(function() {
            $meteor.call('assets.remove', asset._id, function (res){
            });
            $meteor.call('comAssets.remove', asset._id, function (res){
            });
          });
        };
      }
    ]);
