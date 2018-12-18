'use strict';

angular.module('performance').controller('performanceController', ['$scope', '$rootScope', '$reactive', 'Employees', 'Month', '$meteor','$state',
function ($scope, $rootScope, $reactive, Employees, Month, $meteor, $state) {

    //////////////////
    // SUBSCRIBING //
    /////////////////

    $reactive(this).attach($scope);

    this.subscribe('employees', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    /////////////////////
    // INITIAL VALUES //
    ///////////////////

    $scope.filter = {};
    $scope.display = {};
    $scope.select = {};
    $scope.role = false;

    $scope.select.months = Month;
    $scope.select.years = ()=>{
      var d = new Date(),
        date = d.getFullYear(),
        data = [];
      for(var i=date;i>=2017;i-- ) {
        data.push(i);
      }
      return data;
    }

    $scope.convertMonth = (month) =>{
      var data = {},
        month = Month.indexOf(month),
        year = $scope.getReactively('filter.year');

        data.slated = new Date(year, month, 1);
        data.due =  new Date(year, month + 1, 1);
        return data;
    }
    ////////////////
    // FILTERING //
    //////////////

    $scope.resetFilter = () => {
      var d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth();

      $scope.filter = {
        month : Month[month],
        year : year,
        limit : 20,
        page : 1
      };
    };

    $scope.employeesFiltering =  () => {
      var queryEmployees = {
        status : { $ne : 'x'}
      };

      if($scope.getReactively('filter.name'))
        queryEmployees.name = new RegExp($scope.getReactively('filter.name'),'i');

      return queryEmployees;
    };

    $scope.vendorsFiltering =  () => {
      var queryVendors = {
        status : {$ne : 'x'}
      };

      if($scope.getReactively('filter.vendor'))
        queryVendors.vendor  = $scope.getReactively('filter.vendor');

      return queryVendors;
    };


    ///////////////////
    // Display Data //
    ///////////////////
    $scope.pagination = (q) =>{
      q.limit = 20;
      q.skip = 0;

     if($scope.getReactively('filter.limit'))
       q.limit = $scope.getReactively('filter.limit');

     if($scope.getReactively('filter.limit'))
       q.skip = $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1);

    }

    $scope.absence = (q) =>{
      if(q.name)
         q.name = $scope.getReactively('filter.name');

      var date = $scope.convertMonth($scope.getReactively('filter.month'));
         q.slated = date.slated;
         q.due = date.due;

      q.team = $rootScope.getReactively('currentUser.currentTeam');

      $scope.pagination(q);

      $meteor
        .call('attendances.absence', q)
        .then((res) => {
          $scope.employees=res;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.vendorData = (q) =>{

      var date = $scope.convertMonth($scope.getReactively('filter.month'));
        q.slated = date.slated;
        q.due = date.due;

      q.team = $rootScope.getReactively('currentUser.currentTeam');

      $scope.pagination(q);

      $meteor
        .call('attendances.vendors', q)
        .then((res) => {
          $scope.vendors = res;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.vendorCount = (q) =>{

      var date = $scope.convertMonth($scope.getReactively('filter.month'));
        q.slated = date.slated;
        q.due = date.due;

      q.team = $rootScope.getReactively('currentUser.currentTeam');

      $meteor
        .call('attendances.vendorsCount', q)
        .then((res) => {
          $scope.vendorsCount = res;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.helpers({
      employees : () => {
        var queryEmployees = $scope.employeesFiltering();
        $scope.absence(queryEmployees);
      },
      employeesCount: () => {
        var queryEmployees = $scope.employeesFiltering();
        return Employees.find(queryEmployees).count();
      },
      vendors : () => {
        var queryVendors = $scope.vendorsFiltering();
        $scope.vendorData(queryVendors);
      },
      vendorsCount : () => {
        var queryVendors = $scope.vendorsFiltering();
        $scope.vendorCount(queryVendors);
      }
    });

    $scope.find = () => {
      $scope.display.employee = null;
      $scope.resetFilter();
    };

    $scope.findOne = function () {
      $scope.display.employee = $state.params.id;
    };

    ////////////////////////////////
    // CONTEXT-SPECIFIC FUNCTIONS //
    ////////////////////////////////

    $scope.displayDate = () =>{
        var month = Month.indexOf($scope.getReactively('filter.month')),
          year = $scope.getReactively('filter.year'),
          firstDate = new Date (year,month,1),
          lastDate = new Date(year,month,new Date(year,month+1,0).getDate()),
          days = [];

        for (var d = firstDate; d <= lastDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        $scope.days = days;
    };

    $scope.notYetDate= (due)=> {
      var date = new Date()
      if(due.getTime()>date.getTime())
        return false;

      return true;
    }

    $scope.changeRole = (stateRole) => {
      $scope.role =  stateRole;
    }

    $scope.toDate = (date) => {
      return date.map(function(x) {
        return x.getDate();
      })
    }

  }
]);
