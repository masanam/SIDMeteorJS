import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Investigations = new Mongo.Collection('investigations');

/*
 * fullName
 * shortName
 * position
 * dic
 * phone
 * location
 * victim
 * chronologic
 * effect
 * action
 * created
 * creator
 * status
 * team
 */

// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('investigations', function () {
    return Investigations.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('investigations').factory('Investigations', function (){
    return Investigations;

  });
}
