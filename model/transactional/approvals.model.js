import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// COLLECTION DECLARATIONS
export const Approvals = new Mongo.Collection('approvals');

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
  Meteor.publish('approvals', function (model, ref) {
    return Approvals.find({ model: model, ref: ref });
  });
  
  Meteor.publish('userApprovals', function () {
    return Approvals.find({ approval: 'p', approver: this.userId() });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('core').factory('Approvals', function (){
    return Approvals;
  });
}
