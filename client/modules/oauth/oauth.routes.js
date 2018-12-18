'use strict';

angular.module('auth').config(function ($stateProvider) {
  $stateProvider
    .state('oauth', {
      url: '/oauth',
      templateUrl: 'client/modules/oauth/views/main.layout.html',
      controller: 'OauthController',
      abstract: true,
      breadcrumb: {
        label: 'OAuth'
      }
    })
    .state('oauth.list-client', {
      url: '/client',
      templateUrl: 'client/modules/oauth/views/list-client.view.html',
      title: 'OAuth Clients List',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'List of Client' // display Page title still
      },
    })
    .state('oauth.upsert-client', {
      url: '/client/upsert/:clientId',
      templateUrl: 'client/modules/oauth/views/upsert-client.view.html',
      title: 'OAuth Update or Insert Client',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Upsert Client' // display Page title still
      },
    })
    .state('oauth.signin', {
      url: '/client/signin/?response_type&client_id&client_secret&redirect_uri&scope&state',
      templateUrl: 'client/modules/oauth/views/oauth/signin.view.html',
      title: 'VAuth Sign In',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Upsert Client' // display Page title still
      },
    })
    .state('oauth.authorize', {
      url: '/client/authorize/?response_type&client_id&client_secret&redirect_uri&scope&state',
      templateUrl: 'client/modules/oauth/views/oauth/authorize.view.html',
      title: 'OAuth Update or Insert Client',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Upsert Client' // display Page title still
      },
    });
});
