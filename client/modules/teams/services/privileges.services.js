angular.module('teams').factory('Privileges', function (){
  return [
    'employee.create',
    'employee.edit',
    'employee.subordinate.edit',
    'employee.approval',
    
    'asset.edit', // create and edit
    'asset.approval',

    'visitor.edit', // create and edit
    'visitor.approval',

    'vendor.edit',
    'vendor.approval',

    'rfid.create',
    'rfid.edit',

    'team.edit',
  ];
});