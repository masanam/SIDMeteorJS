'use strict';

angular.module('core').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

  // Redirect to 404 when route not found
  $urlRouterProvider.otherwise(function ($injector, $location) {
    $injector.get('$state').transitionTo('core.not-found', null, {
      location: false
    });
  });

  $stateProvider
    .state('core', {
      url: '/',
      templateUrl: 'client/modules/core/views/layout/core.layout.html',
      controller: 'CoreController',
      abstract: true,
      title: 'Home'
    })
    .state('core.home', {
      url: '',
      controller: 'dashboardController',
      templateUrl: 'client/modules/core/views/dashboard/dashboard.view.html',
      title: 'Home'
      // templateUrl: 'client/modules/attendances/views/list.view.html',
      // title: 'Attendances List'
    })
    .state('core.not-found', {
      url: '404',
      templateUrl: 'client/modules/core/views/home/404.view.html',
      title: 'Not Found'
    })
    .state('core.forbidden', {
      url: '403',
      templateUrl: 'client/modules/core/views/home/403.view.html',
      title: 'Forbidden'
    });
});
