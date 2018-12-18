'use strict';

angular.module('roles').config(function ($stateProvider) {
  $stateProvider
    .state('roles', {
      url: '/roles',
      templateUrl: 'client/modules/roles/views/main.layout.html',
      controller: 'rolesController',
      abstract: true
    })
    .state('roles.list', {
      url: '',
      templateUrl: 'client/modules/roles/views/list.view.html',
      title: 'Roles List'
    })
    .state('roles.create', {
      url: '/create',
      templateUrl: 'client/modules/roles/views/create.view.html',
      title: 'Create New Roles'
    })
    .state('roles.view', {
      url: '/:id',
      templateUrl: 'client/modules/roles/views/view.view.html',
      title: 'View Roles'
    })
    .state('roles.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/roles/views/update.view.html',
      title: 'Update Roles'
    });
});
