'use strict';

angular.module('attendances').config(function ($stateProvider) {
  $stateProvider
    .state('attendances', {
      url : '/attendances',
      templateUrl : 'client/modules/attendances/views/main.layout.html',
      controller : 'AttendancesController',
      abstract : true
    })
    .state('attendances.list', {
      url: '',
      templateUrl : 'client/modules/attendances/views/list.view.html',
      title : 'Attendances List'
    })
    ;
});
