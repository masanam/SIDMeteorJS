import { Meteor } from 'meteor/meteor';
import { Investigations } from '../../../model/compliance/investigations.model';

// METHOD ENDPOINTS
Meteor.methods({
  'investigations.insert' (investigation) {
    // Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Investigations.insert({
      slated: investigation.slated,
      name: investigation.name,
    	nickname: investigation.nickname,
      position: investigation.position,
      deptInCharge: investigation.deptInCharge,
      phone: investigation.phone,
      location: investigation.location,
      victim: investigation.victim,
      chronology: investigation.chronology,
      effect: investigation.effect,
      action: investigation.action,
      created: new Date(),
      creator: Meteor.userId(),
      team: Meteor.team()._id
    });

    return res;
  },
  'investigations.update' (id, investigation) {
  	// Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Investigations.update(id, {
      $set: {
          slated: investigation.slated,
          name: investigation.name,
          nickname: investigation.nickname,
          position: investigation.position,
          deptInCharge: investigation.deptInCharge,
          phone: investigation.phone,
          location: investigation.location,
          victim: investigation.victim,
          chronology: investigation.chronology,
          effect: investigation.effect,
          action: investigation.action,
          updated: new Date(),
    }
  });

    return res;
  },
  'investigations.remove' (investigationId) {
    check(investigationId, String);
    if (Investigations.private && Investigations.owner !== Meteor.userId()) {
    // If the employees is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
    }

    var res = Investigations.update(investigationId, {
      $set: {status: 'x'}
    });
    return res;
  },

});
