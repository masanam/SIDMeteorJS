'use strict';

angular.module('finance').config(function ($stateProvider) {
  $stateProvider
    .state('finance', {
      url: '/finance',
      templateUrl: 'client/modules/finance/views/main.layout.html',
      controller: 'FinanceController',
      abstract: true
    })
    .state('finance.list', {
      url: '',
      templateUrl: 'client/modules/finance/views/list.view.html',
      title: 'Team List'
    })
    .state('finance.create', {
      url: '/create',
      templateUrl: 'client/modules/finance/views/create.view.html',
      title: 'Create New Team'
    })
    .state('finance.update', {
      url: '/:id',
      templateUrl: 'client/modules/finance/views/update.view.html',
      title: 'Update Team'
    });
});
