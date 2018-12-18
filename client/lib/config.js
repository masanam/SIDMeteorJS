'use strict';

export default function ($locationProvider, $urlRouterProvider, $qProvider, $mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $qProvider.errorOnUnhandledRejections(false);

  const iconPath =  '/mdi.svg';

  $mdIconProvider.defaultIconSet('/mdi.svg');
}
