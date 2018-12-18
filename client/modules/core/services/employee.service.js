'use strict';

angular.module('core').factory('Employee', ['Employees', '$meteor', function(Employees, $meteor) {

  var employee = {};

  $meteor.subscribe('Employees');

  employee.name = (id) => {
    return Employees.findOne({_id : id}, {name: 1});
  }

  return employee;

}
]);
