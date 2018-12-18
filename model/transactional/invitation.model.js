import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


// COLLECTION DECLARATIONS
export const Invitation = new Mongo.Collection('invitation');

/*
 * email
 * message
 * team
 * invitation_time
 * creator
 * status
 */

// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('invitations', function (currentTeam) {
    if(currentTeam)
      return Invitation.find({ team: currentTeam });
    else
      return Invitation.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('invitation').factory('Invitation', function (){
    return Invitation;

  });
}
