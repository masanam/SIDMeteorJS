import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Visitors = new Mongo.Collection('visitors');

/*
 * Name
 * Institution
 * validFrom
 * validThru
 * rfid
 * identityType
 * identityNo
 * Address
 * Phone
 * Sponsor
 * Status
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish visitors that are public or belong to the current user
  Meteor.publish('visitors', function (teamId) {
    return Visitors.find({ team: teamId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('visitors').factory('Visitors', function (){
    return Visitors;
  });
}
