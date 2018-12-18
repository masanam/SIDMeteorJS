'use strict';

angular.module('violations').config(function ($stateProvider) {
  $stateProvider
    .state('violations', {
      url: '/violations',
      templateUrl: 'client/modules/violations/views/main.layout.html',
      controller: 'ViolationsController',
      abstract: true
    })
    .state('violations.list', {
      url: '',
      templateUrl: 'client/modules/violations/views/list.view.html',
      title: 'Violations List'
    })
    .state('violations.history', {
      url: '/history/:employee',
      templateUrl: 'client/modules/violations/views/history.view.html',
      title: 'Violation History'
    })
    .state('violations.create', {
      url: '/create/:employee',
      templateUrl: 'client/modules/violations/views/create.view.html',
      title: 'Add Violation'
    })
    .state('violations.view', {
      url: '/:employee/:id',
      templateUrl: 'client/modules/violations/views/list.view.html',
      title: 'Violations Details'
    })

    .state('violations.details', {
      url: '/details?employee?no',
      templateUrl: 'client/modules/violations/views/detail.view.html',
      title: 'Violation Details'
    });
});
