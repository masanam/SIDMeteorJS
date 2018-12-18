angular.module('account').factory('ApprovalSchemes', function() {
  var as = {};

  as.schemes = [
     { title: 'Employee', icon: 'account-box' },
     { title: 'Asset', icon: 'treasure-chest' },
     { title: 'Visitor', icon: 'account-switch' },
     { title: 'License', icon: 'account-key' },
     { title: 'Vendor', icon: 'home-assistant' },
     { title: 'Observation', icon: 'eye' },
     { title: 'Inspection', icon: 'find-replace' },
     { title: 'Corrective Action', icon: 'playlist-check' }
   ];

   as.types = [
    { label: 'All', value: 'a' },
    { label: 'Or', value: 'o' },
    { label: '1 members', value: 1 },
    { label: '2 members', value: 2 },
    { label: '3 members', value: 3 },
    { label: '4 members', value: 4 },
    { label: '5 members', value: 5 },
   ];

   return as;
 });