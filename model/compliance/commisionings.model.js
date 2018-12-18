import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Commisionings = new Mongo.Collection('commisionings');

/*
 * asset
 * dateofentry
 * duedate
 * inspector
 * responsiblecompany
 * location
 * doctype {}
 * accessarea
 * status
 * created
 * creator
 * team
 */


// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish assets that are public or belong to the current user
  Meteor.publish('commisionings', function (teamId) {
    return Commisionings.find({ team: teamId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('commisionings').factory('Commisionings', function (){
    return Commisionings;
  });
}
