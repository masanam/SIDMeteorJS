import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Jobtitle = new Mongo.Collection('jobtitle');

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish jobtitle that are public or belong to the current user
  Meteor.publish('jobtitle', function () {
    return Jobtitle.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('jobtitle').factory('Jobtitle', function (){
    return Jobtitle;
  });
}
