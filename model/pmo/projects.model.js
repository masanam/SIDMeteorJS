import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// COLLECTION DECLARATIONS
export const Projects = new Mongo.Collection('projects');

/*
 * name
 * notes
 * start
 * end
 * milestones []
 * team
 * status
 * created
 * creator
 * updated
 * updater
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish assets that are public or belong to the current user
  Meteor.publish('projects', function (team) {
    return Projects.find({ team: team });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('timesheets').factory('Projects', function (){
    return Projects;
  });
}
