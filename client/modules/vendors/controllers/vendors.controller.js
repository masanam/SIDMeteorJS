'use strict';

angular.module('vendors').controller('vendorsController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Industries', 'Vendors',
  function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog, Industries,  Vendors) {

    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('vendors', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    // $scope.vendor = {};
    $scope.display = {};
    $scope.filter = {};
    $scope.industries = Industries;


    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.vendor = {};
      $scope.display.edit = true;
    };

    $scope.resetFilter = function () {
      $scope.filter = {
        limit: 20,
        page: 1
      };
    };

    ////////////////
    // BASIC CRUD //
    ////////////////
    $scope.filtering = function () {
      var query = {
        status:{ $ne : 'x' }
      };

      if($scope.getReactively('filter.creator'))
        query.creator = $scope.filter.creator;

      if($scope.getReactively('filter.q'))
        query.name = new RegExp($scope.filter.q,"i");

      if($scope.getReactively('filter.industry'))
        query.industry = $scope.filter.industry;

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };
    $scope.helpers({

      vendors : () => {
        var query = $scope.filtering();

        return Vendors.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      vendorsCount : () => {
        var query = $scope.filtering();
        return Vendors.find(query).count();
      },
      vendor : () => {
        return Vendors.findOne($scope.getReactively('display.id'));
      },

      industryTypes: ()=>{
        return ['Manufacture','Technology','Education','Financial'];
      },
    });

    $scope.findOne = function () {
      $scope.display.id = $state.params.id;
    };

    $scope.find = function () {
      $scope.resetForm();
      $scope.resetFilter();
      $scope.display.edit = false;
    };

    $scope.create = (vendors) => {
      $meteor
        .call('vendors.insert', vendors)
        .then((res) => {
          $state.go('vendors.list');
        }, (err) => {

        });
    };

    $scope.update = function (id, vendor) {
      $meteor
        .call('vendors.update', $scope.display.id,vendor)
        .then((res) => {
          $state.go('vendors.list');
        }, (err) => {

        });
      };

    $scope.delete = function (vendor) {
      var confirm = $mdDialog.confirm()
        .title('Delete Vendor')
        .textContent('Are you sure you want to delete ' + vendor.name + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {

        $meteor.call('vendors.remove', vendor._id, function (res){
        });
      });
    };
  }
]);
