'use strict';

angular.module('employees').factory('EmployeeMultistepform', ['$state', function($state) {

  var multistepForm = {};
  var i = 0;

  multistepForm.steps = [
    'employees.update-personal',
    'employees.update-contact',
    'employees.update-ice',
    'employees.update-credentials',
    'employees.update-employment'
  ];

  multistepForm.next = (current) => {
    var currStep = multistepForm.steps.indexOf(current);
    
    return multistepForm.steps[currStep+1];
  };

  multistepForm.back = (current) => {
    var currStep = multistepForm.steps.indexOf(current);

    return multistepForm.steps[currStep-1];
  };

  return multistepForm;
}
]);
