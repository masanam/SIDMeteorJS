'use strict';

angular.module('visitors').controller('VisitorsController', ['$scope', '$filter','$rootScope', '$reactive', '$meteor', '$state', 'Visitors', 'VisitorTypes', 'IdentityTypes', '$mdDialog',
  function ($scope,$filter,$rootScope, $reactive, $meteor, $state, Visitors, VisitorTypes, IdentityTypes, $mdDialog) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('visitors', function (){
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });
    this.subscribe('employees', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = function () {
      $scope.visitor = {};
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

      if($scope.getReactively('filter.sponsor'))
        query.sponsor = $scope.filter.sponsor;

      if($scope.getReactively('filter.own'))
        query.sponsor = $rootScope.getReactively('currentEmployee._id');

      if($scope.getReactively('filter.q'))
        query.name = new RegExp($scope.filter.q,"i");

      if($scope.getReactively('filter.institution'))
        query.institution = new RegExp($scope.filter.institution,"i");

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };

    $scope.helpers({
      visitors : () => {
        var query = $scope.filtering();

        return Visitors.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      visitorsCount : () => {
        var query = $scope.filtering();

        return Visitors.find(query).count();
      },
      visitor : () => {
        return Visitors.findOne($scope.getReactively('display.id'));
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


    $scope.create = function (visitor) {
        visitor.slated = new Date($filter('date')(visitor.slated, 'yyyy-MM-dd'));
        visitor.due = new Date($filter('date')(visitor.due, 'yyyy-MM-dd'));

        $meteor
          .call('visitors.insert', visitor)
          .then((res) => {
            $state.go('visitors.list');
          }, (err) => {
            console.log(err);
          });
    };

    $scope.update = function(visitor) {
      visitor.slated = new Date($filter('date')(visitor.slated, 'yyyy-MM-dd'));
      visitor.due = new Date($filter('date')(visitor.due, 'yyyy-MM-dd'));

      $meteor
        .call('visitors.update', $scope.display.id,visitor)
        .then((res) => {
          $state.go('visitors.list');
        }, (err) => {
          console.log(err);
        });
    }

    $scope.delete = function (visitor) {
      var confirm = $mdDialog.confirm()
        .title('Delete Visitor')
        .textContent('Are you sure you want to delete ' + visitor.name + '?')
        .ok('Yes')
        .cancel('No');

      $mdDialog.show(confirm).then(() => {
        $meteor
          .call('visitors.remove', visitor._id)
          .then((res) => {

          }, (err) => {

          });
      });
    };

  }
]);
