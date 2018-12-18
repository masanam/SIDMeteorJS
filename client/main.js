import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import { name as vcrm } from './lib/app';

function onReady() {
  angular.bootstrap(document, [
    vcrm
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
