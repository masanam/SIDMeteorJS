import { Meteor } from 'meteor/meteor';
import { Rfid } from '../../model/identity/rfid.model';
import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';
import { Visitors } from '../../model/master/visitors.model';

export default RfidSeeder = function () {
  var team = Teams.findOne({ name: 'Volantech' }),
    employee = Employees.findOne({ name: 'Prasetyo Gema' }),
    visitor = Visitors.findOne({ name: 'Yudista Oktafia' });

  rfid = [
    {
      rfid : "VTIRFIDEMPLY001",
      due: Date.now(),
      team: team._id,
      employee: employee._id,
      status: 'm'
    }, {
      rfid : "VTIRFIDGUEST001",
      due: Date.now(),
      team: team._id,
      visitor: visitor._id,
      status: 'a'
    }
  ];

  if (Rfid.find().count() === 0) {

    rfid.forEach(function(t) {
      Rfid.insert(t);
    });
  }
};
