import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../model/pmo/tasks.model';
import { Projects } from '../../model/pmo/projects.model';

import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';

export default ProjectTaskSeeder = function () {
  var user_pras = Meteor.users.findOne({ username: 'prasgema' }),
    user_aryo = Meteor.users.findOne({ username: 'aryo' }),
    user_martin = Meteor.users.findOne({ username: 'philipusmartin' }),
    user_hasapu = Meteor.users.findOne({ username: 'hasapu' }),
    user_masanam = Meteor.users.findOne({ username: 'masanam' }),
    team_vti = Teams.findOne({ name: 'Volantech' }),
    employee_pras = Employees.findOne({ user: user_pras._id, team: team_vti._id }),
    employee_aryo = Employees.findOne({ user: user_aryo._id, team: team_vti._id }),
    employee_martin = Employees.findOne({ user: user_martin._id, team: team_vti._id }),
    employee_hasapu = Employees.findOne({ user: user_hasapu._id, team: team_vti._id }),
    employee_masanam = Employees.findOne({ user: user_masanam._id, team: team_vti._id });

  if (Projects.find().count() == 0) {
    var projects = [
      { 
        callsign : 'CTR1',
        name : 'Coal Trading App Phase 1',
        company : 'BIB',
        notes : 'The beginning of everything',
        start : Date.now(),
        end : Date.now(),
        milestones : [ 'Coalpedia', 'Deals', 'Approvals' ],
        team : team_vti._id,
        status : 'a'
      }, { 
        callsign : 'BCS1',
        name : 'Sales Approval App Phase 1',
        company : 'BCE',
        notes : 'What feed us for 3 months',
        start : Date.now(),
        end : Date.now(),
        milestones : [ 'Bugfix', 'Customization', 'Refactoring' ],
        team : team_vti._id,
        status : 'a'
      }, { 
        callsign : 'BCS2',
        name : 'Marketing Support DB Phase 2',
        company : 'BCE',
        notes : 'The 2.7 series',
        start : Date.now(),
        end : Date.now(),
        milestones : [ 'Contract', 'Scheduler', 'Documents' ],
        team : team_vti._id,
        status : 'a'
      }
    ];

    projects.forEach(function (item){
      Projects.insert(item);
    });
  }

  if (Tasks.find().count() == 0) {
    var project_ctr = Projects.findOne({ callsign: 'CTR1' }),
      project_bcs1 = Projects.findOne({ callsign: 'BCS1' }),
      project_bcs2 = Projects.findOne({ callsign: 'BCS2' }),
      tasks = [
        {
          title: 'Create Customer',
          notes: 'Customer menu need to have better view and can edit all data, create with multi-step form',
          project: project_ctr._id,
          milestone: 'Coalpedia',
          deadline: Date.now(),
          status: 'a',
          team: team_vti._id,
          assignees: [ employee_pras._id, employee_aryo._id ],
        }, {
          title: 'Create Scheduler Filter',
          notes: 'You can filter by date, contract and category',
          project: project_bcs2._id,
          milestone: 'Scheduler',
          deadline: Date.now(),
          status: 'o',
          team: team_vti._id,
          assignees: [ employee_hasapu._id ],
        }, {
          title: 'Change Approval Logic',
          notes: 'By Role',
          project: project_bcs1._id,
          milestone: 'Customization',
          deadline: Date.now(),
          status: 'o',
          team: team_vti._id,
          assignees: [ employee_masanam._id ],
        }, {
          title: 'Email UI/X Fix',
          notes: 'Pak Fu Request',
          project: project_bcs1._id,
          milestone: 'Refactoring',
          deadline: Date.now(),
          status: 'o',
          team: team_vti._id,
          assignees: [ employee_martin._id ],
        }, {
          title: 'Change Document Skeleton',
          notes: 'Pre/Post-shipment',
          project: project_bcs2._id,
          milestone: 'Documents',
          deadline: Date.now(),
          status: 'o',
          team: team_vti._id,
          assignees: [ employee_masanam._id ],
        }
      ];

    tasks.forEach(function(item){
      Tasks.insert(item);
    });
  }
}
