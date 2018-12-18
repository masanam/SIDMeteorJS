import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../../model/master/vendors.model';

// METHOD ENDPOINTS
Meteor.methods({
  'vendors.insert' (vendor) {
    // Make sure the user is logged in before inserting a vendors
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Vendors.insert({
      name: vendor.name,
      legalName: vendor.legalName,
      website: vendor.website,
      industry: vendor.industry,
      address: vendor.address,
      city: vendor.city,
      region: vendor.region,
      postalCode: vendor.postalCode,
      country: vendor.country,
      employeeCount: vendor.employeeCount,
      annualRevenue: vendor.annualRevenue,
      notes: vendor.notes,
      approvals : vendor.approvals,
      status: 'a',
      created: new Date(),
      creator: Meteor.userId(),
      team: Meteor.team()._id
    });

    return res;
  },
  'vendors.update' (id, vendor) {
    // Make sure the user is logged in before inserting a vendors
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Vendors.update(id, {
      $set : {
        name: vendor.name,
        legalName: vendor.legalName,
        website: vendor.website,
        industry: vendor.industry,
        address: vendor.address,
        city: vendor.city,
        region: vendor.region,
        postalCode: vendor.postalCode,
        country: vendor.country,
        employeeCount: vendor.employeeCount,
        annualRevenue: vendor.annualRevenue,
        notes: vendor.notes,
        approvals : vendor.approvals,
        status: vendor.status,
        created: new Date(),
        creator: Meteor.userId()
      }
    });

    return res;
  },

  'vendors.remove' (vendorId) {
    check(vendorId, String);
    //const Vendors = Vendors.findOne(vendorsId);
    if (Vendors.private && Vendors.owner !== Meteor.userId()) {
      // If the vendors is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Vendors.update(vendorId, {
      $set: {status: 'x'}
    });
    return res;
  },

});
