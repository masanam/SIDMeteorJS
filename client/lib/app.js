'use strict';

// library sources
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import mdDataTable from 'angular-material-data-table';
import dndLists from 'angular-drag-and-drop-lists';
import ngclipboard from 'ngclipboard';
import Chart from 'chart.js';
import chartjs from 'angular-chart.js';

// configuration sources
import config from './config';
import theme from './theme';
import init from './init';

// add application name here
export const name = 'vauth';

// add dependancies here
var dependencies = [
  angularMeteor,
  ngSanitize,
  ngMaterial,
  uiRouter,
  mdDataTable,
  'dndLists',
  ngclipboard,
  'chart.js'
];

// add application submodules here
var modules = [
  'core',
  'auth',
  'account',
  'approvals',
  'assets',
  'attendances',
  'audits',
  'commisionings',
  'employees',
  'finance',
  'hazards',
  'identity',
  'inspections',
  'investigations',
  'invitation',
  'jobtitle',
  'licenses',
  'performance',
  'roles',
  'vendors',
  'violations',
  'visitors',
  'teams',
  'timesheets',
];

angular.module(name, dependencies)
  .config(config)
  .config(theme)
  .run(init);

for(var x in modules){
  angular.module(modules[x], dependencies || []);
  angular.module(name).requires.push(modules[x]);
}
