'use strict';

angular.module('teams').config(function ($stateProvider) {
  $stateProvider
    .state('teams', {
      url: '/teams',
      templateUrl: 'client/modules/teams/views/main.layout.html',
      controller: 'TeamsController',
      abstract: true
    })
    .state('teams.list', {
      url: '',
      templateUrl: 'client/modules/teams/views/list.view.html',
      title: 'Teams List',
      roles: ['admin']
    })
    .state('teams.create', {
      url: '/create',
      templateUrl: 'client/modules/teams/views/create.view.html',
      title: 'Create New Teams',
      roles: ['admin']
    })
    .state('teams.view', {
      url: '/:id',
      templateUrl: 'client/modules/teams/views/view.view.html',
      title: 'View Teams',
      roles: ['admin']
    })
    .state('teams.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/teams/views/update.view.html',
      title: 'Update Teams',
      roles: ['admin']
    });
});
