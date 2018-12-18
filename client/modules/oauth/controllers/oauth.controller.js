'use strict';

angular.module('core').controller('OauthController', ['$scope', '$location', '$window', '$reactive', '$state', '$stateParams', '$meteor',
  function ($scope, $location, $window, $reactive, $state, $stateParams, $meteor) {

    $reactive(this).attach($scope);

    $scope.clients = [];
    $scope.client = {};
    $scope.display = {};

    oAuth2Server.subscribeTo.authCode();
    oAuth2Server.subscribeTo.refreshTokens();

    $scope.resetForm = function () {
      $scope.client = {};
      $scope.display.edit = true;
    };

    $scope.find = function () {
      Meteor.call('oauth.findClients', function(err, result) {
        $scope.clients = result;
        $scope.display.edit = false;
      });
    };

    $scope.findOne = function () {
      if($state.params.clientId) {
        Meteor.call('oauth.findOneClient', $state.params.clientId, function(err, result) {
          $scope.client = result;
        });
      }
    };

    $scope.authorize = function () {
      // create an authorization code for the provided client.
      oAuth2Server.callMethod.authCodeGrant(
        $state.params.client_id,
        $state.params.redirect_uri,
        $state.params.response_type,
        $state.params.scope && $state.params.scope.split(' '),
        $state.params.state,
        function(err, result) {
          if(result.success) {
            $scope.redirect_url = result.redirectToUri.toString();
            HTTP.post(
              Meteor.absoluteUrl('oauth/token'), {
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                  grant_type: 'authorization_code',
                  client_id: $state.params.client_id,
                  client_secret: $state.params.client_secret,
                  code: result.authorizationCode
                }
              },
              function(err, result) {
                $window.location.href = $scope.redirect_url;
              } // function
            ); // HTTP.post
          }
        }
      );
    };

    $scope.upsertClient = function (client){
      var newClient = {
        active: true,
        clientId: client.clientId,
        redirectUri: client.redirectUri,
        clientSecret: client.clientSecret,
        clientName: client.clientName,
        status: 'a',
      };
      if($state.params.clientId) {
        newClient._id = $state.params.clientId;
        Meteor.call('oauth.updateClient', newClient, function() {
          $state.go('oauth.list-client');
        });
      } else {
        Meteor.call('oauth.addClient', newClient, function() {
          $state.go('oauth.list-client');
        });
      }
    };

    $scope.deleteClient = function (client){
      Meteor.call('oauth.deleteClient', client._id, function() {
        $scope.$apply(function () {
          $scope.clients.splice($scope.clients.indexOf(client),1);
        });
      });
    };

    $scope.signin = function (email, password) {
      $meteor.loginWithPassword(email, password, function (err){
        if(!err) {
          $state.go('oauth.authorize', {
            response_type: $state.params.response_type,
            client_id: $state.params.client_id,
            client_secret: $state.params.client_secret,
            redirect_uri:$state.params.redirect_uri,
            scope:$state.params.scope,
            state:$state.params.state
          });
        } else {
            alert('Login Failed - Please Try again');
            $state.go('oauth.signin', {
              response_type: $state.params.response_type,
              client_id: $state.params.client_id,
              client_secret: $state.params.client_secret,
              redirect_uri:$state.params.redirect_uri,
              scope:$state.params.scope,
              state:$state.params.state
            });
          }
      });
    };

    $scope.signup = function (registration) {
      if(registration.password !== registration.confirmPassword)
        return $scope.err = 'Password did not match';
      else {
        delete registration.confirmPassword;
        registration.profile.image = '/images/user.png';

        $meteor.createUser(registration, function (err){
          if(!err) {
            alert('Registration Success')
          $state.go('core.home');
          } else {
            alert('Registration Failed - Please Try again')
            $state.go('auth.signup');
            }
        });
      }
    };

    $scope.loginFB = function () {
      $meteor.loginWithFacebook(function(err){
        if(!err)
          $state.go('core.home');
      });
    };

    function reverseString(str) {
      return str.split("").reverse().join("");
    }

    $scope.makeRandomSecret = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 64; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        $scope.client.clientSecret = text;
    };
  }
]);
