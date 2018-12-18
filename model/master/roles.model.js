import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Roles = new Mongo.Collection('roles');

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish roles that are public or belong to the current user
  Meteor.publish('roles', function () {
    return Roles.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('roles').factory('Roles', function (){
    return Roles;
  });
}
