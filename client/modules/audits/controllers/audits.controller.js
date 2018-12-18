'use strict';

angular.module('audits').controller('AuditsController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Audits',
   'Employees', function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog, Audits, Employees) {

    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('audits', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    this.subscribe('employees', () => {
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    $scope.permission = false;
    $scope.audit = {};
    $scope.display = {};
    $scope.filter = {};

    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////

    $scope.resetForm = () => {
      $scope.audit = {};
      $scope.display.edit = true;
    };

    $scope.permission = (data) =>{
      var employeeId = Employees.findOne({ user: $rootScope.getReactively('currentUser._id') })._id;
      return data.includes( employeeId );
    }

    $scope.editor = (editors) => {
       return $scope.permission(editors);
    }

    $scope.viewer = (viewers) => {
      return $scope.permission(viewers);
    }

    ////////////////
    // FILTERING //
    ///////////////

    $scope.resetFilter = () => {
      var d=new Date(),
        year = d.getFullYear(),
        month = d.getMonth(),
        lastDate = new Date(year,month+1,0).getDate();

    $scope.filter = {
      slated : new Date(year,month,1),
      due : new Date(year,month,lastDate),
      limit : 20,
      page : 1
      };
    };

    $scope.filtering = () => {
      var query = {
        status:{ $ne : 'x' },
        type: 'o'
      };

      query.slated = {};

      if($scope.getReactively('filter.type'))
        query.type = 'i';

      if($scope.getReactively('filter.slated'))
        query.slated.$gte = $scope.getReactively('filter.slated');

      if($scope.getReactively('filter.due'))
        query.slated.$lte = $scope.getReactively('filter.due');

      if($scope.getReactively('filter.inspected'))
        query.inspected = new RegExp($scope.filter.inspected,"i");

      if($scope.getReactively('filter.findings'))
        query.findings.finding = $scope.filter.findings;

      if($scope.getReactively('filter.status'))
        query.status = $scope.filter.status;

      return query;
    };

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      audits : () => {
        var query = $scope.filtering();

        return Audits.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      auditCount : () => {
        var query = $scope.filtering();

        return Audits.find(query).count();
      },
      audit : () => {
        return Audits.findOne($scope.getReactively('display.id'));
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

    $scope.create = (audit) => {
      $meteor.call('audits.insert', audit)
        .then((res) => {
          $state.go('audits.list');
        }, (err) => {

        });
    };

    $scope.update = (audit) => {
      $meteor.call('audits.update', $scope.display.id, audit)
        .then((res) => {
          $state.go('audits.list');
        }, (err) => {

        });
    };

    $scope.delete = (audit) => {
      if (audit.type == 'o')
         var type = audit.observed;
      else
         var type = audit.inspected;

      var confirm = $mdDialog.confirm()
        .title('Delete Audit Data')
        .textContent('Are you sure you want to delete ' + type + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then( () => {

        $meteor.call('audits.remove', audit._id, (res) => {
        });
      });
    };

  }
]);
