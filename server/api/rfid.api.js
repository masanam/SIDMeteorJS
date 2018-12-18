import { Meteor } from 'meteor/meteor';

import { Rfid } from '../../model/identity/rfid.model';
import { Employees } from '../../model/master/employees.model';
import { Visitors } from '../../model/master/visitors.model';
import { Attendances } from '../../model/transactional/attendances.model';


/**
 * This is an example where we use the oAuth2 server to allow/deny access to our REST service.
 * In this example, we will use JsonRoutes.
 */

export const Profile = new Mongo.Collection('profile');

JsonRoutes.add('get', '/api/rfid/:rfid?hw', function (req, res, next){
  var rfid = Rfid.findOne({ rfid: req.params.rfid }),
    response = {},
    attendance = {};

  // if no RFID, done, simply stop
  if(!rfid) response = { code: 404, data: 'Card is not found' };

  // if this RFID is owned by employee
  else if(rfid.employee){
    employee = Employees.findOne(rfid.employee); // get data
    attendance.employee = employee._id; //

    if(!employee) response = { code: 404, data: 'Employee Identity Unknown' };
    else if(employee.due < Date.now()) response = { code: 403, data: 'Employee is Expired' };
    else if(employee.status !== 'a') response = { code: 423, data: 'Employee Not Active' };
    else if(employee.facilities.indexOf(hw.facility) === -1) response = { code: 403, data: 'Employee unauthorized for this facility' };
    else if(employee.blacklisted) response = { code: 423, data: 'Employee Blacklisted' };

    else response = { code: 200, data: employee }; // return identity if found
  }

  // if this RFID is owned by visitor
  else if(rfid.visitor){
    visitor = Visitors.findOne(rfid.visitor); // get data
    attendance.visitor = visitor._id; //

    if(!visitor) response = { code: 404, data: 'Visitor Identity Unknown' };
    else if(visitor.due < Date.now()) response = { code: 403, data: 'Visitor Clearance is expired' };
    else if(employee.status !== 'a') response = { code: 423, data: 'Visitor Not Active' };
    else if(visitor.facilities.indexOf(hw.facility) === -1) response = { code: 403, data: 'Visitor unauthorized for this facility' };

    else response = { code: 200, data: visitor }; // return identity if found
  }

  // if RFID is found, but neither visitor nor employee found
  else response = { code: 404, data: 'RFID exist, but Identity Unknown' };

  // bad RFID still need to maintain data
  if(rfid.due < Date.now()) response = { code: 403, data: 'RFID is expired' };
  if(rfid.team !== hw.team) response = { code: 421, data: 'RFID not valid in this location' };
  if(rfid.status !== 'a') response = { code: 410, data: 'RFID is not active. Contact Badge Center'};

  // save attendance data
  attendance.status = response.code;
  attendance.data = response.data;
  attendance.team = hw.team;
  Meteor.call('attendances.insert', attendance);

  // return results
  return JsonRoutes.sendResult(res, { code: code, data: data });
});
