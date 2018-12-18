'use strict';

export default function ($rootScope, $q, $state, $window) {
  'ngInject';

  $rootScope.page = {
    sitename : 'Alteos User Access',
    title : '_',
    breadcrumbs : [],

    // Sets page title
    setTitle: function(title) {
      this.title = title ;
    },

    setBreadcrumbs: function (crumbs) {
      this.breadcrumbs = crumbs;
    }
  };

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // user Role validation; users has to have certail roles in order to have one:
    var pass = false;
    
    if($rootScope.currentUser) authorize(event, toState, toParams, fromState, fromParams);
    $q.defer()
      .resolve(Meteor.user())
      .promise.then(authorize(event, toState, toParams, fromState, fromParams));

    return pass;
  });

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if (error === 'AUTH_REQUIRED'){
      $state.go('auth.signin');

      if (!Meteor.userId() && !Meteor.loggingIn()){
        Meteor.setTimeout(function() {
          if(!$state.params.id) $state.go('auth.signin');
        });
      }
    }
  });

  // Always record previous state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    storePreviousState(fromState, fromParams);

    // Change title
    if ($state.current.title) {
      $rootScope.page.setTitle($state.current.title );
    } else {
      $rootScope.page.setTitle(""); // no title if none specified
    }

    $rootScope.state_name = $state.current.name;
    // Scroll to top of page on refresh
    $window.scrollTo(0, 0);
  });

  // Store previous state
  // only store this state if it shouldn't be ignored
  function storePreviousState (state, params) {
    if (!state || !state.ignoreState) {
      $state.previous = {
        state: state,
        params: params,
        href: $state.href(state, params)
      };
    }
  }
  
  function authorize (event, toState, toParams, fromState, fromParams) {
    if(!toState.roles || toState.roles.indexOf('guest') > -1) pass = true;

    if(toState.roles && $rootScope.currentUser) {
      if(toState.roles.indexOf('user') > 1) pass = true;

      toState.roles.map((r) => {
        if($rootScope.currentUser.roles && $rootScope.currentUser.roles.indexOf(r) > -1) pass = true;
      })
    }

    if(!pass){
      event.preventDefault();
      $state.go('core.forbidden', {}, { location: false });
    }
  }

  // Blur events can be double-fired, so we'll filter those out with prevEvent tracking
  $window.onfocus = function (event) {
    $rootScope.$broadcast('windowFocus', event);
  };

  $window.onblur = function (event) {
    $rootScope.$broadcast('windowBlur', event);
  };
}
