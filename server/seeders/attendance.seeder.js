//===Seeder Attendance===//

import { Meteor } from 'meteor/meteor';
import { Attendances } from '../../model/transactional/attendances.model';
import { Employees } from '../../model/master/employees.model';
import { Visitors } from '../../model/master/visitors.model';

export default AttendanceSeeder = function () {
  if (Attendances.find().count() == 0) {

    var user_hasapu = Meteor.users.findOne({ username: 'hasapu' });
    var employee_hasapu = Employees.findOne({ user: user_hasapu._id });

    var user_masanam = Meteor.users.findOne({ username: 'masanam' });
    var employee_masanam = Employees.findOne({ user: user_masanam._id });

    var user_tine = Meteor.users.findOne({ username: 'tine' });
    var employee_tine = Employees.findOne({ user: user_tine._id });

    var user_juli = Meteor.users.findOne({ username: 'juli' });
    var employee_juli = Employees.findOne({ user: user_juli._id });

    var user_prass = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_prass._id });

    var visitor_yudista= Visitors.findOne({ name:'Yudista Oktafia'});
    var visitor_ibrahim=Visitors.findOne({ name:'Ibrahim Morsi'});

    var d = new Date();
      var hours=  d.getHours();
      var minutes=d.getMinutes();
      var date=   d.getDate();
      var year=   d.getFullYear();
      var month=  d.getMonth();
    for(let i=1;i<=8;i++){
      j=i+3;
      Attendances.insert({
        employee:employee_hasapu._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:employee_hasapu.team
      });

      Attendances.insert({
        employee:employee_masanam._id,
        status: 'u',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:employee_masanam.team
      });

      Attendances.insert({
        employee:employee_tine._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:employee_tine.team,
        vendor:employee_tine.vendor
      });

      Attendances.insert({
        employee:employee_juli._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:employee_juli.team,
        vendor:employee_juli.vendor
      });

      Attendances.insert({
        employee:employee_prass._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:employee_prass.team
      });
      Attendances.insert({
        visitor:visitor_yudista._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:visitor_yudista.team
      });

      Attendances.insert({
        visitor:visitor_ibrahim._id,
        status: 's',
        date:new Date(year,month,date-i),
        in:new Date(year,month,date-i,hours,minutes),
        out:new Date(year,month,date-i,hours+j,minutes+i),
        team:visitor_ibrahim.team
      });
    }


  }
};
