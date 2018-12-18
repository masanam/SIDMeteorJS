'use strict';

angular.module('assets').config(function ($stateProvider) {
  $stateProvider
    .state('assets', {
      url: '/assets',
      templateUrl: 'client/modules/assets/views/main.layout.html',
      controller: 'assetsController',
      abstract: true
    })
    .state('assets.list', {
      url: '',
      templateUrl: 'client/modules/assets/views/list.view.html',
      title: 'Assets List'
    })
    .state('assets.create', {
      url: '/create',
      templateUrl: 'client/modules/assets/views/create.view.html',
      title: 'Create New Assets'
    })
    .state('assets.view', {
      url: '/:id',
      templateUrl: 'client/modules/assets/views/list.view.html',
      title: 'View Assets'
    })
    .state('assets.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/assets/views/update.view.html',
      title: 'Update Assets'
    });
});
