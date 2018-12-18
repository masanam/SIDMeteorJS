import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Transactions = new Mongo.Collection('transactions');

// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish transactions that are public or belong to the current user
  Meteor.publish('transactions', function () {
    return Transactions.find({
      $or: [
        { 'approvers.user': Meteor.user()._id },
        { creator: Meteor.user()._id }, 
      ],
    });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('finance').factory('Transactions', function (){
    return Transactions;
  });
}

// METHOD ENDPOINTS
Meteor.methods({
  'transactions.insert' (transaction, callback) {
    // Make sure the user is logged in before inserting a transaction
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Transactions.insert({
      name: transaction.name,
      desc: transaction.desc,
      createdAt: new Date(),
      owner: Meteor.userId(),
      employees: [
        Meteor.userId()
      ],
    }, callback());
  },
  'transactions.remove' (transactionId) {
    check(transactionId, String);

    const transaction = Transactions.findOne(transactionId);
    if (transaction.private && transaction.owner !== Meteor.userId()) {
      // If the transaction is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    transactions.remove(transactionId);
  },
});