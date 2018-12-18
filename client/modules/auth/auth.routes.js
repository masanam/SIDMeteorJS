'use strict';

angular.module('auth').config(function ($stateProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl: 'client/modules/auth/views/main.layout.html',
      controller: 'AuthController',
      abstract: true,
      breadcrumb: {
        label: 'Home'
      }
    })
    .state('auth.signin', {
      url: '/signin',
      templateUrl: 'client/modules/auth/views/signin.view.html',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Login' // display Page title still
      },
    })
    .state('auth.forgot', {
      url: '/forgot',
      templateUrl: 'client/modules/auth/views/forgot-password.view.html',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Forgot' // display Page title still
      },
    })
    .state('auth.verified', {
      url: '/verified/:token',
      templateUrl: 'client/modules/auth/views/verified.view.html',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Verification' // display Page title still
      },
    })

    .state('auth.unverified', {
      url: '/unverified/:email',
      templateUrl: 'client/modules/auth/views/unverified.view.html',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Verification' // display Page title still
      },
    })

    .state('auth.signup', {
      url: '/signup/:id',
      templateUrl: 'client/modules/auth/views/signup.view.html',
      breadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Sign Up' // display Page title still
      },
    });
});
