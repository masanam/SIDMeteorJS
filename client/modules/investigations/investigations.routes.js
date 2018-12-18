'use strict';

angular.module('investigations').config(function ($stateProvider) {
  $stateProvider
    .state('investigations', {
      url: '/investigations',
      templateUrl: 'client/modules/investigations/views/main.layout.html',
      controller: 'InvestigationsController',
      abstract: true
    })
    .state('investigations.list', {
      url: '',
      templateUrl: 'client/modules/investigations/views/list.view.html',
      title: 'Investigation List'
    })
    .state('investigations.create', {
      url: '/create',
      templateUrl: 'client/modules/investigations/views/create.view.html',
      title: 'Create New Investigation'
    })
    .state('investigations.view', {
      url: '/:id',
      templateUrl: 'client/modules/investigations/views/list.view.html',
      title: 'Investigation Details'
    })
    .state('investigations.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/investigations/views/update.view.html',
      title: 'Update Investigation'
    });
});
