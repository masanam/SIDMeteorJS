import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Teams = new Mongo.Collection('teams');

/*
 * name
 * about
 * industry
 * icon
 * website
 * city
 * country
 * owner
 * admin
 * setting
 * * asset
 * * vendor
 * * audit
 * * payroll
 * * reimbursement
 * * pm
 * * rfid
 * * visitors
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish teams that are public or belong to the current user
  Meteor.publish('teams', function () {
    return Teams.find({});
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('teams').factory('Teams', function (){
    return Teams;
  });
}
