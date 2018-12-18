'use strict';

angular.module('account').controller('AccountController', ['$scope', '$rootScope', '$state', '$meteor', '$mdDialog',
  function ($scope, $rootScope, $state, $meteor, $mdDialog) {

    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $scope.user = {};
    $scope.display = {};
    $scope.password = '';
    $scope.cpassword = '';

    $scope.find = function () {
      delete $scope.display.id;
      $scope.display.edit = false;
    };

    $scope.findOne = function () {
      $scope.user = $rootScope.currentUser;
    };

    ////////////////
    // BASIC CRUD //
    ////////////////

    $scope.update = function(user) {
      console.log(user);
      $meteor
        .call('user.updateProfile', user)
        .then((res) => {
          $scope.display.edit = false;
          $state.go('account.view');
        }, (err) => {
          console.log(err);
        });
    };

    $scope.delete = function (email) {
      var confirm = $mdDialog.confirm()
        .title('Delete Employees')
        .textContent('Are you sure you want to delete ' + email + '?')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $meteor
          .call('user.removeEmail', email)
          .then((res) => {
            $state.go('account.view');
          }, (err) => {
            console.log(err);
          });
      });
    };

    $scope.resetPassword = function(user) {
      Accounts.changePassword(user.oldPassword, user.newPassword, function(err) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(err)
          alert('Wrong old password');
        else
          $state.go('account.view');
      });
    };

    $scope.addEmail = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Your New Email')
        .placeholder('someone@example.com')
        .ariaLabel('Email')
        .targetEvent(ev)
        .ok('Add')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(res) {
        $meteor
          .call('user.addEmail', res)
          .then((res) => {
            $state.go('account.view');
          }, (err) => {
            console.log(err);
          });
      }, function() {
        $scope.status = 'You didn\'t add any email';
      });
    };
  }
]);
