'use strict';

angular.module('auth').config(function ($stateProvider) {
  $stateProvider
    .state('account', {
      url: '/account',
      templateUrl: 'client/modules/account/views/main.layout.html',
      controller: 'AccountController',
      abstract: true
    })
    .state('account.view', {
      url: '/profile',
      templateUrl: 'client/modules/account/views/profile/view.view.html',
      title: 'Your Profile'
    })
    .state('account.emails', {
      url: '/emails',
      templateUrl: 'client/modules/account/views/emails/list.view.html',
      title: 'Your Emails'
    })
    .state('account.password', {
      url: '/reset',
      templateUrl: 'client/modules/account/views/profile/change-password.html',
      title: 'Change Password'
    })
    .state('account.teams', {
      url: '/teams',
      templateUrl: 'client/modules/account/views/teams/list.view.html',
      controller: 'AccountTeamsController',
      title: 'Your Teams'
    })
    .state('account.update-employee', {
      url: '/teams/:id/update-employee',
      templateUrl: 'client/modules/account/views/teams/update-employee.view.html',
      controller: 'EmployeesController',
      title: 'Update Your Data'
    })
    .state('account.team-details', {
      url: '/teams/:teamId/team-details',
      templateUrl: 'client/modules/account/views/teams/details/update.view.html',
      controller: 'TeamsController',
      title: 'Update Your Team'
    })
    .state('account.team-create', {
      url: '/teams/create',
      templateUrl: 'client/modules/account/views/teams/details/create.view.html',
      controller: 'TeamsController',
      title: 'Create Your Team'
    })
    .state('account.team-roles', {
      url: '/teams/:teamId/team-roles',
      templateUrl: 'client/modules/account/views/teams/roles/update.view.html',
      controller: 'TeamsController',
      title: 'Roles & Privileges'
    })
    .state('account.team-clearances', {
      url: '/teams/:teamId/team-clearances',
      templateUrl: 'client/modules/account/views/teams/clearances/update.view.html',
      controller: 'TeamsController',
      title: 'Permit Request'
    })
    .state('account.team-facilities', {
      url: '/teams/:teamId/team-facilities',
      templateUrl: 'client/modules/account/views/teams/facilities/update.view.html',
      controller: 'TeamsController',
      title: 'Branch/Area/Facilities'
    })
    .state('account.team-approvals', {
      url: '/teams/:teamId/team-approvals',
      templateUrl: 'client/modules/account/views/teams/approvals/update.view.html',
      controller: 'TeamsController',
      title: 'Approval Schemes'
    });
});
