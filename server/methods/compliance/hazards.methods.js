import { Meteor } from 'meteor/meteor';
import { Hazards } from '../../../model/compliance/hazards.model';

// METHOD ENDPOINTS
Meteor.methods({
  'hazards.insert' (hazard) {
    // Make sure the user is logged in before inserting a license
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var item = {
      type: hazard.type,
      date: hazard.date,
      location: hazard.location,
      danger: hazard.danger,
      action: hazard.action,
      status: hazard.status,
      created: new Date(),
      creator: Meteor.userId(),
      team: Meteor.team()._id
    };

    if(hazard.type != 'f'){
      item.violator = hazard.violator;
      item.desc = hazard.desc;
    }

    var res = Hazards.insert(item);

    return res;
  },

  'hazards.update' (id, hazard) {
    // Make sure the user is logged in before inserting a hazard
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var item = {
      type: hazard.type,
      date: hazard.date,
      location: hazard.location,
      danger: hazard.danger,
      action: hazard.action,
      status: hazard.status,
      updated: new Date()
    };

    if(hazard.type != 'f'){
      item.violator = hazard.violator;
      item.desc = hazard.desc;
    }

    var res = Hazards.update(hazard._id, { $set: item });

    return res;
  },

  'hazards.remove' (hazardId) {
    check(hazardId, String);
    //const Hazards = Hazards.findOne(hazardsId);
    if (Hazards.private && Hazards.owner !== Meteor.userId()) {
      // If the hazard is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Hazards.update(hazardId, {
      $set: {status: 'x'}
    });
    return res;
  },

});
