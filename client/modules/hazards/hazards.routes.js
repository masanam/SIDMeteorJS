'use strict';

angular.module('hazards').config(function ($stateProvider) {
  $stateProvider
    .state('hazards', {
      url: '/hazards',
      templateUrl: 'client/modules/hazards/views/main.layout.html',
      controller: 'hazardsController',
      abstract: true
    })
    .state('hazards.list', {
      url: '',
      templateUrl: 'client/modules/hazards/views/list.view.html',
      title: 'Hazard List'
    })
    .state('hazards.create', {
      url: '/create',
      templateUrl: 'client/modules/hazards/views/create.view.html',
      title: 'Insert New Hazard Report'
    })
    .state('hazards.view', {
      url: '/:id',
      templateUrl: 'client/modules/hazards/views/list.view.html',
      title: 'View Hazards'
    })
    .state('hazards.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/hazards/views/update.view.html',
      title: 'Update Hazards'
    });
});
