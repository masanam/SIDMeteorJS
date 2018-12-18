import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Timeoffs = new Mongo.Collection('timeoffs');

/*
 * title
 * notes
 * type
 * date
 * duration
 * approvers [{ user, status, dateCreated, dateApproved }]
 * status
 * creator
 * created
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish timeoffs that are public or belong to the current user
  Meteor.publish('timeoffs', function () {
    return Timeoffs.find({
      $or: [
        { 'approvers.user': this.userId },
        { creator: this.userId }, 
      ],
    });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('timesheets').factory('Timeoffs', function (){
    return Timeoffs;
  });
}

// METHOD ENDPOINTS
Meteor.methods({
  'timeoffs.insert' (timeoff, callback) {
    check(timeoff, String);

    // Make sure the user is logged in before inserting a timeoff
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Timeoffs.insert({
      name: timeoff.name,
      notes: timeoff.notes,
      createdAt: new Date(),
      owner: Meteor.userId(),
      employees: [
        Meteor.userId()
      ],
    }, callback());
  },
  'timeoffs.remove' (timeoffId) {
    check(timeoffId, String);

    const timeoff = Timeoffs.findOne(timeoffId);
    if (timeoff.private && timeoff.owner !== Meteor.userId()) {
      // If the timeoff is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    timeoffs.remove(timeoffId);
  },
});