import { Meteor } from 'meteor/meteor';
import { Employees } from '../../../model/master/employees.model';
import { Invitation } from '../../../model/transactional/invitation.model';

var record = {};

// METHOD ENDPOINTS
Meteor.methods({
  'employees.insert' (employee) {
    // Make sure the user is logged in before inserting a employee
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var existing = Employees.find({
      user: employee.user,
      team: Meteor.team()._id,
    }).fetch();

    if(existing[0])
      throw new Meteor.Error(409, 'The employee you\'re about to create already existed');

    if(employee.profile.name) {
      account = {
        password: 'secret',
        username: employee.profile.name,
        email: employee.profile.email,
        profile: {
          name: employee.profile.name,
          phone: employee.profile.phone,
          image: '/images/user.png',
        }
      };

      Accounts.createUser(account);

      var user = Meteor.users.findOne({ username: employee.profile.name });
      if(user) {
        employee.user = user._id;
        employee.name = user.profile.name;
      }

    };

    var record = {
      user: employee.user,
      status: employee.status,
      salutation: employee.salutation,
      name: employee.name,
      surname: employee.surname,
      suffix: employee.suffix,
      birthPlace: employee.birthPlace,
      birthDate: employee.birthDate,
      marital: employee.marital,
      gender: employee.gender,
      blood: employee.blood,
      nationality: employee.nationality,
      photo: '',
      team: Meteor.team()._id,
      created: new Date(),
      creator: Meteor.userId()
    };

    var res = Employees.insert(record);

    if(res) {
      Meteor.call('emailAddEmployee', account, (err,results) => {
        Employees.update(res, {
          $set: {
            emailStatus: true,
          }
        });
      });
    };

    return record;

  },

  'employees.update' (id, employee) {
    // add history logic here
    var history = [],
      currentHistory = {},
      changes = {};

    // personal
    if(employee.user) changes.user = employee.user;
    if(employee.status) changes.status = employee.status;
    if(employee.salutation) changes.salutation = employee.salutation;
    if(employee.name) changes.name = employee.name;
    if(employee.surname) changes.surname = employee.surname;
    if(employee.suffix) changes.suffix = employee.suffix;
    if(employee.birthPlace) changes.birthPlace = employee.birthPlace;
    if(employee.birthDate) changes.birthDate = employee.birthDate;
    if(employee.marital) changes.marital = employee.marital;
    if(employee.gender) changes.gender = employee.gender;
    if(employee.blood) changes.blood = employee.blood;
    if(employee.blacklisted) changes.blacklisted = employee.blacklisted;

    // contacts
    if(employee.emails) changes.emails = employee.emails;
    if(employee.phones) changes.phones = employee.phones;
    if(employee.addresses) changes.addresses = employee.addresses;

    // ice
    if(employee.ice) changes.ice = employee.ice;

    // identities
    // if(employee.credentials) changes.credentials = employee.credentials;
    if(employee.identity) changes.identity = employee.identity;

    // employment
    if(employee.employeeId) changes.employeeId = employee.employeeId;
    if(employee.operatingId) changes.operatingId = employee.operatingId;
    if(employee.title) changes.title = employee.title;
    if(employee.vendor) changes.vendor = employee.vendor;
    if(employee.roles) changes.roles = employee.roles;
    if(employee.privileges) changes.privileges = employee.privileges;
    if(employee.subordinates) changes.subordinates = employee.subordinates;
    if(employee.supervisor) changes.supervisor = employee.supervisor;

    changes.history = history;
    changes.updated = Date.now(),
    changes.updater = Meteor.user()._id

    var changes = Employees.update(id, {
      $set: changes
    });

    return changes;
  },

  'employees.remove' (employeeId) {
    check(employeeId, String);
    //const Employees = Employees.findOne(employeeId);
    if (Employees.private && Employees.owner !== Meteor.userId()) {
      // If the employees is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Employees.update(
      {_id: employeeId},
      { $set :  {status: 'x'} }
    );
  },
});
