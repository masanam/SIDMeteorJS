import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// COLLECTION DECLARATIONS
export const ApprovalHistories = new Mongo.Collection('approvalhistories');

/*
 * model --> model 
 * ref --> id dari reference approval ini
 * sequence
 * approver
 * approval --> status
 * approved --> date
 * notes
 * due
 * status --> retracted? active?
 * created
 * updated
 */

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish assets that are public or belong to the current user
  Meteor.publish('approvalhistories', function (model, ref) {
    return ApprovalHistories.find({ model: model, ref: ref });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('core').factory('ApprovalHistories', function (){
    return ApprovalHistories;
  });
}
