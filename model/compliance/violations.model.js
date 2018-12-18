import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


// COLLECTION DECLARATIONS
export const Violations = new Mongo.Collection('violations');

/*
 * violationNo
 * employee
 * case
 * remark
 * team
 * creator
 * status
 * createdAt
 */


// PUBLICATION RULES
if (Meteor.isServer) {

  // This code only runs on the server
  // Only publish staff that are public or belong to the current user
  Meteor.publish('violations', function (currentTeam) {
    if(currentTeam) {
      return Violations.find({ team: currentTeam });
    }
    else
      return Violations.find({ user: this.userId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('violations').factory('Violations', function (){
    return Violations;

  });
}
