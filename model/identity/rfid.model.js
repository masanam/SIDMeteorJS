import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Rfid = new Mongo.Collection('rfid');

/*
 * rfid, unique
 * status
 * due
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish identity that are public or belong to the current user
  Meteor.publish('rfid', function (teamId) {
    return Rfid.find({ team: teamId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('identity').factory('Rfid', function (){
    return Rfid;
  });
}
