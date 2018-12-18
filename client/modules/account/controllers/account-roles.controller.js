'use strict';

angular.module('account').controller('AccountRolesController', ['$scope', '$mdDialog', 'Privileges',
  function ($scope, $mdDialog, Privileges) {
    $scope.privileges = Privileges;
    $scope.role = {};

    $scope.addRole = function () {
      if(!$scope.team.roles) $scope.team.roles = [];
      $scope.team.roles.push({ name: 'New Role' });
    };

    $scope.deleteRole = function (idx) {
      var confirm = $mdDialog.confirm()
        .title('Delete this role?')
        .textContent('Once deleted, you cannot restore it')
        .ariaLabel('Delete Role')
        .ok('Yes')
        .cancel('Cancel');
      
      $mdDialog.show(confirm).then(function() {
        $scope.team.roles.splice(idx, 1);
      }, function() {
        $scope.status = 'You decided to keep this role.';
      }); 
    };


    $scope.toggle = function (item, role) {
      if(!role.privileges) role.privileges = [];

      var idx = role.privileges.indexOf(item);
      if (idx > -1) {
        role.privileges.splice(idx, 1);
      }
      else {
        role.privileges.push(item);
      }
    };

    $scope.exists = function (item, list) {
      if(!list) list = [];
      return list.indexOf(item) > -1;
    };
  }
]);