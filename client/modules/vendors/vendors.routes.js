'use strict';

angular.module('vendors').config(function ($stateProvider) {
  $stateProvider
    .state('vendors', {
      url: '/vendors',
      templateUrl: 'client/modules/vendors/views/main.layout.html',
      controller: 'vendorsController',
      abstract: true
    })
    .state('vendors.list', {
      url: '',
      templateUrl: 'client/modules/vendors/views/list.view.html',
      title: 'Vendors List'
    })
    .state('vendors.create', {
      url: '/create',
      templateUrl: 'client/modules/vendors/views/create.view.html',
      title: 'Create New Vendors'
    })
    .state('vendors.view', {
      url: '/:id',
      templateUrl: 'client/modules/vendors/views/list.view.html',
      title: 'View Vendors'
    })
    .state('vendors.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/vendors/views/update.view.html',
      title: 'Update Vendors'
    });
});
