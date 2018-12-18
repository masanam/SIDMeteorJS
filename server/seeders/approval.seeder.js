import { Meteor } from 'meteor/meteor';
import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';
import { Visitors } from '../../model/master/visitors.model';
import { Approvals } from '../../model/transactional/approvals.model';

export default ApprovalSeeder = function () {
  if (Approvals.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' }),
      user_martin = Meteor.users.findOne({ username: 'philipusmartin' }),
      team = Teams.findOne({ name: 'Volantech' }),
      employee_pras = Employees.findOne({ user: user_pras._id, team: team._id }),
      employee_martin = Employees.findOne({ user: user_martin._id, team: team._id }),
      visitor = Visitors.findOne({});
    
    Approvals.insert({
      model: 'Visitor',
      ref: visitor._id,
      approver: employee_martin._id,
      approval: 'p',
      due: Date.now(),
      created: Date.now(),
      updated: Date.now(),
      team: team._id,
      sequence: 0,
    });
    
    Approvals.insert({
      model: 'Visitor',
      ref: visitor._id,
      approver: employee_pras._id,
      approval: 'p',
      due: Date.now(),
      created: Date.now(),
      updated: Date.now(),
      team: team._id,
      sequence: 0,
    });
  }
}
