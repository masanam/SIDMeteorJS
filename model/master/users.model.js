import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// PUBLICATION RULES
if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    var currentUser;
    currentUser = this.userId;

    if (currentUser) {
    return Meteor.users.find({
        _id: currentUser
    }, {
      fields: {
        emails: 1,
        profile: 1,
        roles: 1,
        currentTeam: 1
      }
    });
    } else {
      return this.ready();
    }
  });

  Meteor.publish('allUserData', function () {
    return Meteor.users.find({}, {
      fields: {
        username: 1,
        profile: 1,
      }
    });
  });

  Meteor.publish('userId', function () {
    return Meteor.users.find({}, {
      fields: {
        username: 1,
        profile: 1,
        emails: 1,
      }
    });
  });
}


if (Meteor.isClient) {
  Meteor.subscribe('userData');
  Meteor.subscribe('allUserData');
  Meteor.subscribe('userId');
}
