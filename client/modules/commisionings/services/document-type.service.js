'use strict';

angular.module('commisionings').factory('DocumentType', ['$state', 'Assets', '$meteor',  function($state, Assets, $meteor) {


  $meteor.subscribe('assets');
  var docType = {};

  docType.type = {
    'Lands': ['L1','L2','L3','L4'],
    'Vehicle': ['V1','V2','V3','V4'],
    'Tools': ['T1','T2','T3','T4'],
    'Uniform': ['U1','U2','U3','U4'],
    'Machine': ['M1','M2','M3','M4']
  };

  docType.assetId = (assetId) => {
     var asset = Assets.findOne({_id : assetId});
     return docType.type[asset.type];
  };

  return docType;
}
]);
