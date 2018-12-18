'use strict';

angular.module('identity').config(function ($stateProvider) {
  $stateProvider
    .state('rfid', {
      url: '/rfid',
      templateUrl: 'client/modules/rfid/views/main.layout.html',
      controller: 'RfidController',
      abstract: true
    })
    .state('rfid.list', {
      url: '',
      templateUrl: 'client/modules/rfid/views/list.view.html',
      title: 'RFID List'
    })
    .state('rfid.create', {
      url: '/create',
      templateUrl: 'client/modules/rfid/views/create.view.html',
      title: 'Create New RFID'
    })
    .state('rfid.create-bulk', {
      url: '/create-bulk',
      templateUrl: 'client/modules/rfid/views/create-bulk.view.html',
      title: 'Bulk Create New RFID'
    })
    .state('rfid.view', {
      url: '/:id',
      templateUrl: 'client/modules/rfid/views/list.view.html',
      title: 'View RFID'
    })
    .state('rfid.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/rfid/views/update.view.html',
      title: 'Update RFID'
    });
});
