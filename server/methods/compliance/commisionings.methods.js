import { Meteor } from 'meteor/meteor';
import { Commisionings } from '../../../model/compliance/commisionings.model';

// METHOD ENDPOINTS
Meteor.methods({
  'commisionings.insert' (commisioning) {
    // Make sure the user is logged in before inserting a assets
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Commisionings.insert({
      asset:commisioning.asset,
      slated:commisioning.slated,
      due:commisioning.due,
      inspector:commisioning.inspector,
      responsiblecompany:commisioning.responsiblecompany,
      location:commisioning.location,
      doctype:commisioning.doctype,
      accessarea:commisioning.accessarea,
      status: commisioning.status,
      created: new Date(),
      creator: Meteor.userId(),
      team: Meteor.team()._id
    });

    return res;
  },

  'commisionings.update' (id, commisioning) {
    var res = Commisionings.update(id, {
      $set: {
          slated:commisioning.slated,
          due:commisioning.due,
          inspector:commisioning.inspector,
          responsiblecompany:commisioning.responsiblecompany,
          location:commisioning.location,
          doctype:commisioning.doctype,
          accessarea:commisioning.accessarea,
          status: commisioning.status,
          updated: new Date(),
      }
    });

    return res;
  },

   'commisionings.remove' (commisioningId) {
     check(commisioningId, String);

     if (Commisionings.private && Commisionings.owner !== Meteor.userId()) {
       // If the vendors is private, make sure only the owner can delete it
       throw new Meteor.Error('not-authorized');
     }

     var res = Commisionings.update(commisioningId, {
       $set: {status: 'x'}
     });
     return res;
  }

});
