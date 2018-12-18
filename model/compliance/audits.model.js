import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Audits = new Mongo.Collection('audits');

/*
 * slated
 * due
 * inspector
 * inspected
 * dic
 * location
 * findings {}
 * fDesc
 * fCate
 * action
 * photo
 * status
 * created
 * creator
 * team
 */

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish visitors that are public or belong to the current user
  Meteor.publish('audits', function (teamId) {
    return Audits.find({ team: teamId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('audits').factory('Audits', function (){
    return Audits;

  });
}
