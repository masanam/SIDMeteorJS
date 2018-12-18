import { Meteor } from 'meteor/meteor';
import { Employees } from '../model/master/employees.model';
import { Teams } from '../model/master/teams.model';


Meteor.startup(() => {
  Meteor.app = {
    name: 'alteos',
    version: '1.0.1'
  };


  Meteor.employee = () => {
    return Employees.findOne({
      user: Meteor.user()._id,
      team: Meteor.user().currentTeam
    });
  };

  Meteor.team = () => {
    return Teams.findOne(Meteor.user().currentTeam);
  };

  Meteor.teamId = () => {
    return Meteor.user().currentTeam;
  };

  Meteor.subscription = () => {
    return Meteor.team().subscription;
  };
});
