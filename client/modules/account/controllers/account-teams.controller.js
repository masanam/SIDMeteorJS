'use strict';

angular.module('account').controller('AccountTeamsController', ['$scope', '$rootScope', '$state', '$reactive', '$window', '$mdDialog', '$meteor', 'Teams', 'Employees',
  function ($scope, $rootScope, $state, $reactive, $window, $mdDialog, $meteor, Teams, Employees) {
    ////////////////////
    // INITIAL VALUES //
    ////////////////////

    $reactive(this).attach($scope);
    this.subscribe('employees');
    this.subscribe('employments');

    $scope.display.employeeId = $state.params.employeeId;
    $scope.display.teamId = $state.params.teamId;

    ///////////////////
    // STANDARD CRUD //
    ///////////////////

    $scope.helpers({
      employees: () => {
        return Employees.find({
          user: $rootScope.getReactively('currentUser._id'),
          status: 'a'
        });
      },
      employments: () => {
        return Employees.find({ user: $rootScope.getReactively('currentUser._id') });
      }
    });

    $rootScope.helpers({
      currentEmployee: () => {
        return Employees.findOne({
          team: $rootScope.getReactively('currentUser.currentTeam'),
          user: $rootScope.getReactively('currentUser._id')
        });
      },
      currentTeam: () => {
        return Teams.findOne($rootScope.getReactively('currentUser.currentTeam'));
      }
    });


    ////////////////////////////////
    // CONTEXT-SPECIFIC FUNCTIONS //
    ////////////////////////////////

    $scope.changeTeam = function (teamId) {
      console.log(teamId);
      $meteor.call('auth.selectTeam', teamId);
    };

    $scope.resign = function (emp, team) {
      if($rootScope.currentUser.currentTeam === emp.team){
        alert('You cannot delete your current team, switch to other team before doing!');
      } else {
        var confirm = $mdDialog.prompt()
          .title('Confirm your resignation')
          .htmlContent('<p>Type your Employee ID to continue.</p><p>IMPORTANT: this process is irreversible, you will need admin approval to reenter company</p>')
          .placeholder('Employee ID (case sensitive)')
          .ariaLabel('employee-id')
          .ok('Resign')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function(res) {
          if(res === emp.employeeId){
            emp.status = 'r';
            Meteor.call('employees.update', emp._id, emp);
          } else {
            alert('Cancelled, wrong employeeId');
          }
        }, function() {
          $scope.status = 'You didn\'t add any email';
        });
      }
    };
  }
]);
