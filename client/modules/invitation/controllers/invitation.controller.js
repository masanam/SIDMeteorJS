'use strict';

angular.module('invitation').controller('InvitationController', ['$scope', '$rootScope', '$reactive', '$meteor', '$state', '$mdDialog', 'Invitation',
  function ($scope, $rootScope, $reactive, $meteor, $state, $mdDialog,  Invitation) {

        ////////////////////
        // INITIAL VALUES //
        ////////////////////

        $reactive(this).attach($scope);
        this.subscribe('invitations', () => {
          return [ $rootScope.getReactively('currentUser.currentTeam') ];
        });

        $scope.invitations = {};
        $scope.display = {};
        $scope.filter = {};

        ////////////////////
        // FORM FUNCTIONS //
        ////////////////////

        $scope.resetForm = () => {
          $scope.invitation = {};
          $scope.invitation.emailList = [];
          $scope.display.edit = true;
        };

        $scope.resetFilter = () => {
          $scope.filter = {
            limit: 20,
            page: 1
          };
        };

        ////////////////
        // BASIC CRUD //
        ////////////////

        $scope.filtering = () => {
          var query = {
            status:{ $ne : 'x' }
          };

          if($scope.getReactively('filter.creator'))
            query.creator = Meteor.userId();

          if($scope.getReactively('filter.q'))
            query.email = new RegExp($scope.filter.q,"i");

          if($scope.getReactively('filter.status'))
            query.status = $scope.filter.status;

          return query;
        };

        $scope.helpers({

          invitations : () => {
            var query = $scope.filtering();

            return Invitation.find(query, {
              limit: $scope.getReactively('filter.limit'),
              skip: $scope.getReactively('filter.limit') * ($scope.getReactively('filter.page')-1)
            });
          },
          invitationsCount : () => {
            var query = $scope.filtering();

            return Invitation.find(query).count();
          },
          invitation : () => {
            return Invitation.findOne($scope.getReactively('display.id'));
          },
        });

        $scope.findOne = () => {
          $scope.display.id = $state.params.id;
        };

        $scope.find = () => {
          $scope.resetForm();
          $scope.resetFilter();
          $scope.display.edit = false;
        };

        //////////////////////
        //SPECIFIC FUNCTIONS//
        //////////////////////

        $scope.send = () => {
          if($scope.invitation.emailList[0]) {
            if($scope.invitation.emailList.length === 0) {
              $scope.display.required = 'This field is required';
            } else {
              $scope.display.required = undefined;
              $meteor
                .call('invitation.insert', $scope.invitation)
                .then((res) => {
                  $scope.display.error = undefined;
                  $state.go('invitation.list');
                }, (err) => {
                      $scope.display.error = err;
                    });
                  }
          } else {
            $meteor
              .call('invitation.insert', $scope.invitation)
              .then((res) => {
                $scope.display.error = undefined;
                $state.go('invitation.list');
              }, (err) => {
                $scope.display.error = err;
              });
          }
        };

        $scope.resend = (invitation) => {
          $meteor
            .call('invitation.resend', invitation._id, invitation)
            .then((res) => {

            }, (err) => {

            });
        };

        $scope.uninvited = (invitation) => {
          $meteor
            .call('invitation.uninvited', invitation._id, invitation)
            .then((res) => {

            }, (err) => {

            });
        };
      }
    ]);
