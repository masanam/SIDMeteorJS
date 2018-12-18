import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


// COLLECTION DECLARATIONS
  export const Attendances = new Mongo.Collection('attendances');

  /*
   * employee
   * status
   * date
   * in
   * out
   * team
   */

// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('attendances', function (teamId) {
    return Attendances.find({team: teamId});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('attendances').factory('Attendances', function (){
    return Attendances;
  });
}
