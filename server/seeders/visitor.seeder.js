/*
 * hasapu  09-06-2017 - made seeder
 */

import { Meteor } from 'meteor/meteor';
import { Visitors } from '../../model/master/visitors.model';
import { Employees } from '../../model/master/employees.model';

export default VisitorSeeder = function () {
  if (Visitors.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_pras = Employees.findOne({ user: user_pras._id });

    var user_martin = Meteor.users.findOne({ username: 'philipusmartin' });
    var employee_martin = Employees.findOne({ user: user_martin._id });

    var user_aryo = Meteor.users.findOne({ username: 'aryo' });
    var employee_aryo = Employees.findOne({ user: user_aryo._id });

    Visitors.insert({
      name: 'Yudista Oktafia',
      institution:'Baba Studio',
      position: 'Programmer',
      age: '25',
      type: 'Guest',
      phone: '081243423553',
      email: 'okta@gmail.com',
      address: 'Jl Kodok Gg. Ribit',
      identityType: 'KTP',
      identityNo: '3325425262566',
      image: 'image/link.png',
      slated: new Date(),
      due: new Date(),
      site: 'All Site',
      applicationReq: 'Entering Site',
      applicationType: 'New Application',
      sponsor: employee_aryo._id,
      team:employee_aryo.team,
      status: 'p'
    });

    Visitors.insert({
      name: 'Ibrahim Morsi',
      institution:'Egyptian God Cards',
      position: 'Lead Dev',
      age: '30',
      type: 'Guest',
      phone: '081243423553',
      email: 'imorsi@egypt.gov',
      address: 'Jl Kodok Gg. Ribit',
      identityType: 'Passport',
      identityNo: 'A7227281',
      image: 'image/link.png',
      slated: new Date(),
      due: new Date(),
      site: 'All Site',
      applicationReq: 'Entering Site',
      applicationType: 'New Application',
      sponsor: employee_pras._id,
      team:employee_pras.team,
      status: 'a'
    });

    Visitors.insert({
      name: 'Juliani Eva',
      institution:'Binus',
      position: 'Student',
      age: '25',
      type: 'Guest',
      phone: '081243423553',
      email: 'juli@volantech.io',
      address: 'Jl Kodok Gg. Ribit',
      identityType: 'SIM',
      identityNo: '123671823123092',
      image: 'image/link.png',
      slated: new Date(),
      due: new Date(),
      site: 'All Site',
      applicationReq: 'Entering Site',
      applicationType: 'New Application',
      sponsor: employee_martin._id,
      team:employee_martin.team,
      status: 'p'
    });

    Visitors.insert({
      name: 'Michael Van Wis Lee',
      institution:'UMN',
      position: 'Student',
      age: '23',
      type: 'Guest',
      phone: '081243423553',
      email: 'emvewell@gmail.com',
      address: 'Jl Kodok Gg. Ribit',
      identityType: 'SIM',
      identityNo: '2345563645',
      image: 'image/link.png',
      slated: new Date(),
      due: new Date(),
      site: 'All Site',
      applicationReq: 'Entering Site',
      applicationType: 'New Application',
      sponsor: employee_martin._id,
      team:employee_martin.team,
      status: 'p'
    });

    Visitors.insert({
      name: 'Jonathan Christopher',
      institution:'UMN',
      position: 'Student',
      age: '23',
      type: 'Guest',
      phone: '081243423553',
      email: 'gregoriusjonathanchristopher@gmail.com',
      address: 'Jl Kodok Gg. Ribit',
      identityType: 'KITAS',
      identityNo: '2345563645',
      image: 'image/link.png',
      slated: new Date(),
      due: new Date(),
      site: 'All Site',
      applicationReq: 'Entering Site',
      applicationType: 'New Application',
      sponsor: employee_pras._id,
      team:employee_pras.team,
      status: 'p'
    });

  }
};
