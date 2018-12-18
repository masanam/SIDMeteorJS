import { Meteor } from 'meteor/meteor';
import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';

export default EmployeeSeeder = function () {
  if (Employees.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' }),
      user_aryo = Meteor.users.findOne({ username: 'aryo' }),
      user_martin = Meteor.users.findOne({ username: 'philipusmartin' }),
      user_hasapu = Meteor.users.findOne({ username: 'hasapu' }),
      user_masanam = Meteor.users.findOne({ username: 'masanam' }),
      team_vti = Teams.findOne({ name: 'Volantech' }),
      team_am = Teams.findOne({ name: 'Anakmuda' }),
      team_rcp = Teams.findOne({ name: 'RCP Convection' });

    Employees.insert({ team: team_vti._id, user: user_pras._id, status: 'a', name: 'Prasetyo Gema', sureName: '', employeeId: 'VTI-1', roles: ['badge-center'], gender: 'm', rfid: '' });
    Employees.insert({ team: team_am._id, user: user_pras._id, status: 'a', name: 'Prasetyo Gema', sureName: '', employeeId: 'AM-1', gender: 'm', rfid: '' });
    Employees.insert({ team: team_rcp._id, user: user_pras._id, status: 'a', name: 'Prasetyo Gema', sureName: '', employeeId: 'RCP-1', gender: 'm', rfid: '' });

    Employees.insert({ team: team_vti._id, user: user_martin._id, status: 'a', name: 'Martin Salamdjaja', sureName: '', employeeId: 'VTI-2', roles: ['badge-center'], gender: 'm', rfid: '' });
    Employees.insert({ team: team_rcp._id, user: user_martin._id, status: 'a', name: 'Martin Salamdjaja', sureName: '', employeeId: 'RCP-2', gender: 'm', rfid: '' });

    Employees.insert({ team: team_vti._id, user: user_aryo._id, status: 'a', name: 'Aryo Gema', sureName: '', employeeId: 'VTI-3', roles: ['coordinator'], gender: 'm', rfid: '' });
    Employees.insert({ team: team_am._id, user: user_aryo._id, status: 'a', name: 'Aryo Gema', sureName: '', employeeId: 'AM-2', gender: 'm', rfid: '' });

    Employees.insert({ team: team_vti._id, user: user_hasapu._id, status: 'a', name: 'Hari Sakti Putra', sureName: '', employeeId: 'VTI-4', roles: ['coordinator'], gender: 'm', rfid: '' });
    Employees.insert({ team: team_vti._id, user: user_masanam._id, status: 'a', name: 'Choirul Anam', sureName: '', employeeId: 'VTI-5', gender: 'm', rfid: '' });
  }
}
