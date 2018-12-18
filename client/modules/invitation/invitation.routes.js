'use strict';

angular.module('invitation').config(function ($stateProvider) {
  $stateProvider
    .state('invitation', {
      url: '/invitation',
      templateUrl: 'client/modules/invitation/views/main.layout.html',
      controller: 'InvitationController',
      abstract: true
    })
    .state('invitation.list', {
      url: '',
      templateUrl: 'client/modules/invitation/views/list.view.html',
      title: 'Invitation List'
    })
    .state('invitation.create', {
      url: '/create',
      templateUrl: 'client/modules/invitation/views/create.view.html',
      title: 'Create New Invitation'
    })
    .state('invitation.create-bulk', {
      url: '/create-bulk',
      templateUrl: 'client/modules/invitation/views/create-bulk.view.html',
      title: 'Bulk Create New RFID'
    })
    .state('invitation.view', {
      url: '/:id',
      templateUrl: 'client/modules/invitation/views/list.view.html',
      title: 'View Invitation'
    })
    .state('invitation.update', {
      url: '/:id/update',
      templateUrl: 'client/modules/invitation/views/update.view.html',
      title: 'Update Invitation'
    });
});
