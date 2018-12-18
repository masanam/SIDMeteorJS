'use strict';

angular.module('timesheets').config(function ($stateProvider) {
  $stateProvider
    .state('timesheets', {
      url: '/timesheets',
      templateUrl: 'client/modules/timesheets/views/main.layout.html',
      controller: 'TimesheetsController',
      abstract: true
    })
    .state('timesheets.list', {
      url: '',
      templateUrl: 'client/modules/timesheets/views/list.view.html',
      title: 'Timesheet'
    })
    .state('timesheets.create', {
      url: '/create',
      templateUrl: 'client/modules/timesheets/views/create.view.html',
      title: 'Create New Team'
    })
    .state('timesheets.update', {
      url: '/:id',
      templateUrl: 'client/modules/timesheets/views/update.view.html',
      title: 'Update Team'
    });
});
