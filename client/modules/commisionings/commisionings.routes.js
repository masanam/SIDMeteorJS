'use strict';

angular.module('commisionings').config(function ($stateProvider) {
  $stateProvider
    .state('commisionings', {
      url: '/commisionings',
      templateUrl: 'client/modules/commisionings/views/main.layout.html',
      controller: 'CommisioningsController',
      abstract: true
    })
    .state('commisionings.list', {
      url: '?asset',
      templateUrl: 'client/modules/commisionings/views/list.view.html',
      title: 'Commisionings List'
    })
    .state('commisionings.all', {
      url: '',
      templateUrl: 'client/modules/commisionings/views/list.view.html',
      title: 'Commisionings List'
    })
    .state('commisionings.create', {
      url: '/create?asset',
      templateUrl: 'client/modules/commisionings/views/create.view.html',
      title: 'Add Commisionings'
    })
    .state('commisionings.view', {
      url: '/:id/detail',
      templateUrl: 'client/modules/commisionings/views/list.view.html',
      title: 'Commisionings Details'
    })
    .state('commisionings.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/commisionings/views/update.view.html',
      title: 'Update Commisionings'
    });
});
