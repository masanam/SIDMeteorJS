'use strict';

angular.module('visitors').config(function ($stateProvider) {
  $stateProvider
    .state('visitors', {
      url: '/visitors',
      templateUrl: 'client/modules/visitors/views/main.layout.html',
      controller: 'VisitorsController',
      abstract: true
    })
    .state('visitors.list', {
      url: '',
      templateUrl: 'client/modules/visitors/views/list.view.html',
      title: 'Visitor List'
    })
    .state('visitors.create', {
      url: '/create',
      templateUrl: 'client/modules/visitors/views/create.view.html',
      title: 'Register Visitor',
      controller: 'VisitorFormController'
    })
    .state('visitors.view', {
      url: '/:id',
      templateUrl: 'client/modules/visitors/views/list.view.html',
      title: 'Visitor Details'
    })
    .state('visitors.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/visitors/views/update.view.html',
      title: 'Update Visitor',
      controller: 'VisitorFormController'
    });
});
