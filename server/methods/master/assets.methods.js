import { Meteor } from 'meteor/meteor';
import { Assets } from '../../../model/master/assets.model';
import { Commisionings } from '../../../model/compliance/commisionings.model';

// METHOD ENDPOINTS
Meteor.methods({
  'assets.insert' (asset, callback) {
    // Make sure the user is logged in before inserting a assets
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Assets.insert({
      name: asset.name,
      duedate:asset.duedate,
      desc: asset.desc,
      serial: asset.serial,
      type: asset.type,
      status: asset.status,
      age: asset.age,
      location: asset.location,
      qty: asset.qty,
      created: new Date(),
      creator: Meteor.userId(),
      team: Meteor.team()._id
    });

    return res;
  },

  'assets.update' (id, asset) {

    // Make sure the user is logged in before inserting a assets
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Assets.update(id, {
      $set: {
          name: asset.name,
          duedate:asset.duedate,
          desc: asset.desc,
          serial: asset.serial,
          type: asset.type,
          status: asset.status,
          age: asset.age,
          location: asset.location,
          qty: asset.qty,
          updated: new Date()
    }
  });

   return res;
  },

  'assets.remove' (assetId) {
    check(assetId, String);
    //const Assets = Assets.findOne(assetsId);
    if (Assets.private && Assets.owner !== Meteor.userId()) {
      // If the assets is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Commisionings.update(assetId, {
      $set: {status: 'x'}
    });

    var res = Assets.update(assetId, {
      $set: {status: 'x'}
    });
    return res;

  },
});
