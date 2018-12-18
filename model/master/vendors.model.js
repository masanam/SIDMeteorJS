import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Vendors = new Mongo.Collection('vendors');

/*
 * name
 * legalName
 * website
 * industry
 * address
 * city
 * region
 * postalCode
 * employeeCount
 * annualRevenue
 * notes
 * 
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish vendors that are public or belong to the current user
  Meteor.publish('vendors', function (teamId) {
    return Vendors.find({ team: teamId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('vendors').factory('Vendors', function (){
    return Vendors;
  });
}
