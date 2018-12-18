import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Hazards = new Mongo.Collection('hazards');

/*
 * type
 * date
 * location
 * danger
 * action
 * status
 * created
 * creator
 * team
 */

// if type golden rules add 2 field

 /*
 * violator
 * vdesc
 */


// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('hazards', function (teamId) {
    return Hazards.find({team:teamId});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('hazards').factory('Hazards', function (){
    return Hazards;

  });
}
