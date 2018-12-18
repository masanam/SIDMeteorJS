import { Meteor } from 'meteor/meteor';
import { Violations } from '../../model/compliance/violations.model';
import { Employees } from '../../model/master/employees.model';

export default ViolationSeeder = function () {
  if (Violations.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    Violations.insert({
      violationNo : Math.floor((Math.random() * 9999999) + 1000000),
      employee : employee_prass._id,
      case : "Corruption",
      remark : "Corrupting money that worth Rp 3000",
      team:employee_prass.team,
      creator : user_pras._id,
      status : "p",
      created : new Date(2017, 10, 12)
    });

    Violations.insert({
      violationNo : Math.floor((Math.random() * 9999999) + 1000000),
      employee : employee_prass._id,
      case : "Fighting",
      remark : "Having a fight with Mr. Yudista",
      team:employee_prass.team,
      creator : user_pras._id,
      status : "p",
      created : new Date(2017, 10, 12)
    });

    Violations.insert({
      violationNo : Math.floor((Math.random() * 9999999) + 1000000),
      employee : employee_prass._id,
      case : "Rascal",
      remark : "Do things to Mr. Yudista",
      team:employee_prass.team,
      creator : user_pras._id,
      status : "p",
      created : new Date(2017, 10, 12)
    });

  }
};
