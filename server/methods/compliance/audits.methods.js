import { Meteor } from 'meteor/meteor';
import { Audits } from '../../../model/compliance/audits.model';
import { Employees } from '../../../model/master/employees.model';

// METHOD ENDPOINTS
Meteor.methods({
  'audits.insert' (audit, callback) {
    // Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var employeeUser = Employees.findOne({ user: Meteor.userId() });
    var item = {
        type: audit.type,
        slated: audit.slated,
        due: audit.due,
        deptInCharge: audit.deptInCharge,
        location: audit.location,
        findings: audit.findings,
        desc: audit.desc,
        category: audit.category,
        action: audit.action,
        photo: audit.photo,
        status: audit.status,
        created: new Date(),
        creator: Meteor.userId(),
        editors: [employeeUser._id],
        viewers: [employeeUser._id],
        team: Meteor.team()._id
    };

    if(item.type == 'o') {
      item.observer = audit.observer;
      item.observed = audit.observed;
    }
      else if(item.type == 'i') {
        item.inspector = audit.inspector;
        item.inspected = audit.inspected;
      }

    var res = Audits.insert(item);

    return res;
  },
  'audits.update' (id, audit) {
  	// Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var item = {
        type: audit.type,
        slated: audit.slated,
        due: audit.due,
        deptInCharge: audit.deptInCharge,
        location: audit.location,
        findings: audit.findings,
        desc: audit.desc,
        category: audit.category,
        action: audit.action,
        photo: audit.photo,
        status: audit.status,
        created: new Date(),
        creator: Meteor.userId(),
        editors: audit.editors,
        viewers: audit.viewers,
        team: Meteor.team()._id
    };

    if(item.type == 'o') {
      item.observer = audit.observer;
      item.observed = audit.observed;
    }
      else if(item.type == 'i') {
        item.inspector = audit.inspector;
        item.inspected = audit.inspected;
      }

    var res = Audits.update(id, {
      $set: item
    });

    return res;
  },
  'audits.remove' (auditId) {
    check(auditId, String);
    //const Vendors = Vendors.findOne(vendorsId);
    if (Audits.private && Audits.owner !== Meteor.userId()) {
      // If the vendors is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Audits.update(auditId, {
      $set: {status: 'x'}
    });
    return res;
  },
});
