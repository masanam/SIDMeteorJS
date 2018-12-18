angular.module('core').factory('IdentityTypes', function (){

  var identityType = {};

  identityType.visitor = [
    'KITAS',
    'KTP',
    'SIM',
    'Passport',
    'Kartu Pelajar/Mahasiswa'
  ];

  identityType.employee = [
    'KITAS',
    'KTP',
    'Passport'
  ];

  return identityType;
});
