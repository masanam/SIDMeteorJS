import { Meteor } from 'meteor/meteor';
import { Violations } from '../../../model/compliance/violations.model';
import { Employees } from '../../../model/master/employees.model';



// METHOD METHODS
Meteor.methods({
  'violations.insert' (v) {

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var item = {
      violationNo: Math.floor((Math.random() * 9999999) + 1000000),
      employee: v.employee,
      case: v.case,
      remark: v.remark,
      team:Meteor.team()._id,
      creator: Meteor.userId(),
      status: 'p',
      created: new Date()
    }
    var res = Violations.insert(item);
    return res;
  },

  'violations.update' (id, v) {

    // Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var update = Violations.update(id, {
      $set: {
          employee: v.employees,
          case: v.case,
          remark: v.remark,
          status: 'p',
          updated: new Date()
      }
    });

    return res;
  },

  'violations.delete' (violationId) {
    check(violationId, String);
    if (Violations.private && Violations.owner !== Meteor.userId()) {
    // If the employees is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
    }

    var res = Violations.update(violationId, {
      $set: {status: 'x'}
    });
    return res;
  }

});
