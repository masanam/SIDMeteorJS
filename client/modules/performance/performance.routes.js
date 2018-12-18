'use strict';

angular.module('performance').config(function ($stateProvider) {
  $stateProvider
  .state('performance', {
    url: '/performance',
    templateUrl: 'client/modules/performance/views/main.layout.html',
    controller: 'performanceController',
    abstract: true
  })
  .state('performance.list', {
    url:'',
    templateUrl: 'client/modules/performance/views/list-all-performance.view.html',
    title: 'Performance'
  })
  .state('performance.view', {
    url: '/:id',
    controller: 'detailPerformanceController',
    templateUrl: 'client/modules/performance/views/list-details-performance.view.html',
    title: 'Performance'
  })
  ;

});
