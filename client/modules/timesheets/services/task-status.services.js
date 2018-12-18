angular.module('timesheets').factory('TaskStatus', function() {
   return [
     { status: 'b', label: 'Backlog' },
     { status: 'a', label: 'Assigned' },
     { status: 'o', label: 'Ongoing' },
     { status: 'r', label: 'Review' }
   ];
 });