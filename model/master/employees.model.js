import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// COLLECTION DECLARATIONS
export const Employees = new Mongo.Collection('employees');


/*
 *
 * status
 * salutation
 * name
 * surname
 * suffix
 * birthPlace
 * birthDate
 * gender
 * bloodType
 * marital
 * nationality
 * emails []
 * addresses []
 * phones []
 * citizenship {}
 * ice (in case of emergency) []
 * * name
 * * phone
 * * email
 * * address
 * * relationship
 * credentials
 * * ktp
 * * * ktpId
 * * * address
 * * * job
 * * * religion
 * * * validThru
 * * npwp
 * * * npwpId
 * * * issuer
 * * * validFrom
 * * * validThru
 * * passport
 * * * passportNo
 * * * validThru
 * * kitas
 * employeeId
 * operatingId
 * title
 * vendor
 * roles []
 * privileges []
 * subordinates []
 * supervisor []
 * history []
 */


// PUBLICATION RULES
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish employees that are public or belong to the current user

  Meteor.publish('employees', function (currentTeam) {
    if(currentTeam)
      return Employees.find({ team: currentTeam });
    else
      return Employees.find({ user: this.userId });
  });

  Meteor.publish('employments', function () {
    return Employees.find({ user: this.userId });
  });
}

// INJECT COLLECTION AS A SERVICE
if (Meteor.isClient) {
  angular.module('employees').factory('Employees', function (){
    return Employees;
  });
}
