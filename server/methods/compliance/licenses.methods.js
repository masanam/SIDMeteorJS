import { Meteor } from 'meteor/meteor';
import { Licenses } from '../../../model/compliance/licenses.model';
import { Employees } from '../../../model/master/employees.model';

// METHOD ENDPOINTS
Meteor.methods({
  'licenses.insert' (license, callback) {
    // Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Licenses.insert({
        employee: license.employee,
        rfid: license.rfid,
        details: license.details,
        team: Meteor.team()._id,
        created: new Date(),
        creator: Meteor.userId()
      });

      return res;
  },
  'licenses.update' (id, licenses) {
  	// Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Licenses.update(id, {
        $set: {
            details: licenses.details,
            updated: new Date()
        }
    });

    return res;
  },
  'licenses.remove' (licenseId) {
    check(licenseId, String);
    //const Employees = Employees.findOne(employeesId);
    if (Licenses.private && Licenses.owner !== Meteor.userId()) {
    // If the employees is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Licenses.update(licenseId, {
      $set: {status: 'x'}
    });
    return res;
  }

});
