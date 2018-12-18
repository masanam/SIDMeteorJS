import { Meteor } from 'meteor/meteor';
import { Visitors } from '../../../model/master/visitors.model';

// METHOD ENDPOINTS
Meteor.methods({
  'visitors.insert' (visitor, callback) {
    // Make sure the user is logged in before inserting a visitor
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    // insert visitors one by one (if there's many)

    visitor.identities.forEach(function(id) {
      var res = Visitors.insert({
        name: id.name,
        institution:visitor.institution,
        facility: visitor.facility,
        position: id.position,
        age: id.age,
        type: visitor.type,
        phone: id.phone,
        email: id.email,
        address: id.address,
        identityType: id.identityType,
        identityNo: id.identityNo,
        image: 'image/link.png',
        slated: visitor.slated,
        due: visitor.due,
        site: visitor.site,
        applicationReq: visitor.applicationReq,
        applicationType: visitor.applicationType,
        sponsor: visitor.sponsor,
        team: Meteor.team()._id,
        status: 'p',
        rfid: '',
        created: new Date(),
        creator: Meteor.userId()
      });

      return res;
    });

  },

  'visitors.update' (id, visitor) {
    var res = Visitors.update(id,{
      $set: {
          name: visitor.name,
          institution:visitor.institution,
          facility: visitor.facility,
          position: visitor.position,
          age: visitor.age,
          type: visitor.type,
          phone: visitor.phone,
          email: visitor.email,
          address: visitor.address,
          identityType: visitor.identityType,
          identityNo: visitor.identityNo,
          image: 'image/link.png',
          slated: visitor.slated,
          due: visitor.due,
          site: visitor.site,
          applicationReq: visitor.applicationReq,
          applicationType: visitor.applicationType,
          sponsor: visitor.sponsor,
          team:visitor.team,
          status: 'p',
          rfid: '',
          updated: new Date()
      }
    });

    return res;
  },

  'visitors.remove' (visitorId) {
    check(visitorId, String);

    var res = Visitors.update(visitorId, {
      $set: {status: 'x'}
    });
    return res;
  }
});
