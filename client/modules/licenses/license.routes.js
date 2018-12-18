'use strict';

angular.module('licenses').config(function ($stateProvider) {
  $stateProvider
    .state('licenses', {
      url: '/licenses',
      templateUrl: 'client/modules/licenses/views/main.layout.html',
      controller: 'LicensesController',
      abstract: true
    })
    .state('licenses.list', {
      url: '',
      templateUrl: 'client/modules/licenses/views/list.view.html',
      title: 'License List'
    })
    .state('licenses.create', {
      url: '/create',
      templateUrl: 'client/modules/licenses/views/create.view.html',
      title: 'Register License'
    })
    .state('licenses.view', {
      url: '/:id',
      templateUrl: 'client/modules/licenses/views/list.view.html',
      title: 'License Details'
    })
    .state('licenses.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/licenses/views/update.view.html',
      title: 'Update License'
    });
});
