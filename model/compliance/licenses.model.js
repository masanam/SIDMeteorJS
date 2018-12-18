import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Licenses = new Mongo.Collection('licenses');

/*
 * employee
 * rfid
 * detail []
   ** type
   ** id
   ** agency
   ** oissue
   ** odue
 * status
 * created
 * creator
 * team
 */

// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('licenses', function (teamId) {
    return Licenses.find({team: teamId});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('licenses').factory('Licenses', function (){
    return Licenses;

  });
}
