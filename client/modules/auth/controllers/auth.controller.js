'use strict';

angular.module('core').controller('AuthController', ['$scope', '$state', '$meteor','$mdDialog', '$reactive', 'Invitation',
  function ($scope, $state, $meteor,$mdDialog, $reactive, Invitation) {

    $scope.display = {};

    $scope.signin = (email, password) => {
      $meteor
        .call('auth.checkEmailVerification', email)
        .then((res) => {
          if(res) {
            $scope.display.error = undefined;
            $meteor.loginWithPassword(email, password, (err) => {
              if (err) return $scope.display.error = 'Wrong Password!';
              else $state.go('core.home');
            });
          } else $state.go('auth.unverified',{ 'email': email });
        }, (err) => {
          $scope.display.error = err.message;
        });
    }


    $scope.signup = function (registration) {
      if(registration.password !== registration.confirmPassword) return $scope.display.error = 'Password did not match';
      else {
        registration.profile.image = '/images/user.png';
        $meteor
          .call('auth.signup', registration)
          .then((res) => {
            $scope.display.error = undefined;
            if(res) {
              Meteor.call('auth.sendVerificationEmail', registration);
              var conf = $mdDialog.alert()
                .title('Email Verification')
                .textContent('Verification sent to ' +registration.email+ '!')
                .ok('Ok')
                $mdDialog.show(conf).then(function() {
                  $state.go('auth.signin');
              });
            }
          }, (err) => {
            $scope.display.error = err;
          });
      }
    };

    $scope.update = function(email) {
       var email= $state.params.email;
         Meteor.call('auth.updateEmail', email, function(error) {
                    if (error) {
                        throw new Error(error.reason);
                    } else {
                        $state.go('auth.signin');
                    }
                });
              },

    $scope.forgotPassword = function(email) {
     Meteor.call('auth.forgotPassword', email, function(error) {
       if (error) {
            throw new Error(error.reason);
        } else {
          alert( `Reset links sent to ${ email }!`, 'success' );
            $state.go('auth.signin');
        }
      });
    },

    $scope.loginFB = function () {
      $meteor.loginWithFacebook(function(err){
        if(!err) $state.go('core.home');
      });
    };

    $scope.signout = function () {
      $meteor.logout(function (err){
        if(!err) $state.go('auth.signin');
      });
    };

    if($state.current.name==='auth.verified') {
      if ($state.params.token) {
        $meteor
          .call('auth.verifiedEmail', $state.params.token)
          .then((res) => {
            $state.go('auth.verified');
          }, (err) => {
            console.log(err);
            throw new Error(error.reason);
          });
      }
    }

    if($state.current.name==='auth.signup') {
      $reactive(this).attach($scope);
      this.subscribe('invitations');

      Meteor.setTimeout(function() {
        if ($state.params.id) {
          $scope.helpers({
            registration: () => {
              var invite = Invitation.findOne({ _id:$state.params.id});
              if(!invite) $state.go('auth.signin');
              else return invite;
            },
            invite: () => {
              return Invitation.findOne({ _id:$state.params.id });
            }
          });
        }
      }, 500);
    }


  }
]);
