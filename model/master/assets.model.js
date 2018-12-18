import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Assets = new Mongo.Collection('assets');

/*
 * employee (id) --> nullable
 * rfid, unique
 * status
 * due
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish assets that are public or belong to the current user
  Meteor.publish('assets', function () {
    return Assets.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('assets').factory('Assets', function (){
    return Assets;
  });
}
