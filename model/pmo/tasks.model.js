import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Tasks = new Mongo.Collection('tasks');

/*
 * title
 * notes
 * project
 * milestone
 * deadline
 * status
 * assignees --> [ userId ]
 * creator
 * created
 */


// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', (teamId) => {
    return Tasks.find({
      team: teamId,
    });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('timesheets').factory('Tasks', function (){
    return Tasks;
  });
}