'use strict';
//Senpai
angular.module('licenses').controller('LicensesController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Licenses',
 'DateSimper', 'Employee', function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog, Licenses, DateSimper, Employee) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('licenses', () =>{
      return [ $rootScope.getReactively('currentUser.currentTeam') ];
    });

    // $scope.license = {};
    $scope.display = {};
    $scope.filter = {};

    ///////////////////////
    // TOOGLE SHOW HIDE //
   //////////////////////

   $scope.IsVisible = [];

    $scope.ShowHide = (index) => {
      $scope.IsVisible[index] = $scope.IsVisible[index]? false : true;
    };


    ////////////////////
    // FORM FUNCTIONS //
    ////////////////////
    $scope.resetForm = () => {
      $scope.license = {};
      $scope.display.edit = true;
    };

    $scope.resetFilter = () => {
      $scope.filter = {
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

      if($scope.getReactively('filter.type'))
        query['details.type'] = $scope.getReactively('filter.type');

      if($scope.getReactively('filter.employee'))
        query.employee = $scope.getReactively('filter.employee');

      return query;
    };

    $scope.helpers({
      licenses : () => {
        var query = $scope.filtering();
        return Licenses.find(query, {
          limit: $scope.getReactively('filter.limit'),
          skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
        });
      },
      licensesCount : () => {
        var query = $scope.filtering();

        return Licenses.find(query).count();
      },
      license : () => {
        return Licenses.findOne($scope.getReactively('display.id'));
      },
      licenseType: ()=>{
        return ['SIMPER','KIMPER','Land Clearing','Dumping','KIM'];
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

    $scope.create = (license) => {

      license.details.forEach((id) => {
        if(id.govdetails) {
          id.govdetails[0].type = 'A';
          id.govdetails[1].type = 'B1';
          id.govdetails[2].type = 'B2';

          id.govdetails[0].dateUntil = DateSimper.due[0];
          id.govdetails[1].dateUntil = DateSimper.due[1];
          id.govdetails[2].dateUntil = DateSimper.due[2];
        }
      });
      $meteor
        .call('licenses.insert', license)
        .then((res) => {
          $state.go('licenses.list');
        }, (err) => {

        });
    };

    $scope.update = (license) => {

      license.details.forEach((id) => {
        if(id.govdetails) {
          id.govdetails[0].type = 'A';
          id.govdetails[1].type = 'B1';
          id.govdetails[2].type = 'B2';

          id.govdetails[0].dateUntil = DateSimper.due[0];
          id.govdetails[1].dateUntil = DateSimper.due[1];
          id.govdetails[2].dateUntil = DateSimper.due[2];
        }
      });
      $meteor
        .call('licenses.update', $scope.display.id, license)
        .then((res) => {
          $state.go('licenses.list');
        }, (err) => {

        });
    };

    $scope.delete = (license) => {
      var employee = Employee.name(license.employee);
      var confirm = $mdDialog.confirm()
        .title('Delete Licenses')
        .textContent('Are you sure you want to delete ' + employee.name + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor.call('licenses.remove', license._id);
        $state.go('licenses.list');
    });
  };

  }
]);
