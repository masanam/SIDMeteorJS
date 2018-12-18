import { Meteor } from 'meteor/meteor';
import { Teams } from '../../../model/master/teams.model';
import { Employees } from '../../../model/master/employees.model';

// METHOD ENDPOINTS
Meteor.methods({
  'teams.insert' (team) {
    // Make sure the user is logged in before inserting a teams
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Teams.insert({
      name: team.name,
      about: team.about,
      industry: team.industry,
      website: team.website,
      facilities:team.facilities,
      city: team.city,
      icon: team.icon,
      country: team.country,
      setting: team.setting,
      owner: Meteor.userId(),
      admin: [ Meteor.userId() ],
      status: 'a',
      creator: Meteor.userId(),
      created: new Date()
    }, (error, callback) => {
      var record = {
        user: Meteor.userId(),
        status: 'a',
        name: Meteor.user().profile.name,
        photo: '',
        roles : 'admin',
        team: callback,
        created: new Date(),
        creator: Meteor.userId()
      };

      var res = Employees.insert(record);

      return res;
    });

  },
  'teams.update' (teamId, team) {
    var upd = {};

    upd.name = team.name,
      upd.about = team.about;

    var res = Teams.update(teamId, {
      $set: team
    });
    return res;
  },
  'teams.remove' (teamsId) {
    check(teamsId, String);
    //const Teams = Teams.findOne(teamsId);
    if (Teams.private && Teams.owner !== Meteor.userId()) {
      // If the teams is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Teams.update(teamsId, {
      $set: {status: 'x'}
    });
    return res;
  },
});
