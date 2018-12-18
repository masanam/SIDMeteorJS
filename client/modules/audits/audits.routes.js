'use strict';

angular.module('audits').config(function ($stateProvider) {
  $stateProvider
    .state('audits', {
      url: '/audits',
      templateUrl: 'client/modules/audits/views/main.layout.html',
      controller: 'AuditsController',
      abstract: true
    })
    .state('audits.list', {
      url: '',
      templateUrl: 'client/modules/audits/views/list.view.html',
      title: 'Audit List'
    })
    .state('audits.observations.list', {
      url: '',
      templateUrl: 'client/modules/audits/views/observations.list.view.html',
      title: 'Audit List'
    })
    .state('audits.create', {
      url: '/create',
      templateUrl: 'client/modules/audits/views/create.view.html',
      title: 'Create New Audit'
    })
    .state('audits.view', {
      url: '/:id',
      templateUrl: 'client/modules/audits/views/list.view.html',
      title: 'Audit Details'
    })
    .state('audits.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/audits/views/update.view.html',
      title: 'Update Audit'
    });
});
