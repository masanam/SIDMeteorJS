'use strict';

angular.module('performance').controller('detailPerformanceController', ['$scope', '$rootScope', '$reactive',
  '$state', 'Attendances', 'Month', '$meteor',
  function ($scope, $rootScope, $reactive, $state, Attendances, Month, $meteor) {

    //////////////////
    // SUBSCRIBING //
    /////////////////

    $reactive(this).attach($scope);
    this.subscribe('attendances', function (){
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    /////////////////////
    // INITIAL VALUES //
    ///////////////////

    $scope.filter = {};
    $scope.display = {};

    ////////////////
    // FILTERING //
    //////////////

    $scope.convertMonth = (month) =>{
      var data = {},
        month = Month.indexOf(month),
        year = $scope.getReactively('filter.year');

        data.slated = new Date(year, month, 1);
        data.due =  new Date(year, month + 1, 1);
        return data;
    }

    $scope.resetFilter = function () {
      var d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth();

      $scope.display.total = 0;

      $scope.filter = {
        month : Month[month],
        year : year,
        limit : 20,
        page : 1
      };

      return $scope.filter;
    };

    $scope.filtering = function () {
      var query = {};
      query.status = 's';
      query.employee = $state.params.id;

      query.date = {};
        var date = $scope.convertMonth($scope.getReactively('filter.month'));
        query.date.$gte = date.slated;
        query.date.$lte = date.due;

      return query;
    };

    ///////////////////
    // Display Data //
    ///////////////////

    $scope.helpers({
      performance : () => {
        var query = $scope.filtering();
        return Attendances.find(query,{
          limit : $scope.getReactively('filter.limit'),
          skip : $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      performanceCount : () => {
        var query = $scope.filtering();
        return Attendances.find(query).count();
      }
    });

    $scope.totalHours = () =>{
      $scope.hours ={};
      var date = $scope.convertMonth($scope.getReactively('filter.month'));
      $meteor
        .call('attendances.totalHours', $state.params.id, date.slated, date.due)
        .then((res) => {
          $scope.hours.total = res.length ? res[0].totalHours : 0;
        }, (err) => {
          console.log(err);
        });
    }

  }
]);
