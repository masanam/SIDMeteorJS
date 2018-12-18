'use strict';

export default function($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue')
    .warnPalette('red')
    .backgroundPalette('grey');

  $mdThemingProvider.theme('dark')
    .primaryPalette('green')
    .dark();
}