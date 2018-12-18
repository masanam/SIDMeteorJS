'use strict';

angular.module('employees').config(function ($stateProvider) {
  $stateProvider
    .state('employees', {
      url: '/employees',
      templateUrl: 'client/modules/employees/views/main.layout.html',
      controller: 'EmployeesController',
      abstract: true
    })
    .state('employees.list', {
      url: '',
      templateUrl: 'client/modules/employees/views/list.view.html',
      title: 'Employee List'
    })

    .state('employees.create', {
      url: '/create',
      templateUrl: 'client/modules/employees/views/personal/create.view.html',
      title: 'Create Employee'
    })
    .state('employees.view', {
      url: '/:id',
      templateUrl: 'client/modules/employees/views/list.view.html',
      title: 'Employee Details'
    })
    .state('employees.update-personal', {
      url: '/:id/update-personal',
      templateUrl: 'client/modules/employees/views/personal/update.view.html',
      title: 'Employee Personal Data'
    })
    .state('employees.update-contact', {
      url: '/:id/update-contact',
      templateUrl: 'client/modules/employees/views/contact/update.view.html',
      title: 'Employee Contact'
    })
    .state('employees.update-ice', {
      url: '/:id/update-ice',
      templateUrl: 'client/modules/employees/views/ice/update.view.html',
      title: 'Employee Emergency Contact'
    })
    .state('employees.update-credentials', {
      url: '/:id/update-credentials',
      templateUrl: 'client/modules/employees/views/credentials/update.view.html',
      title: 'Identities'
    })
    .state('employees.update-employment', {
      url: '/:id/update-employment',
      templateUrl: 'client/modules/employees/views/employment/update.view.html',
      title: 'Employee Designation'
    });
});
