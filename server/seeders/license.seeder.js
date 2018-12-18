import { Meteor } from 'meteor/meteor';
import { Licenses } from '../../model/compliance/licenses.model';
import { Employees } from '../../model/master/employees.model';

export default LicenseSeeder = function () {
  if (Licenses.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    var user_hasapu = Meteor.users.findOne({ username: 'hasapu' });
    var employee_hasapu = Employees.findOne({ user: user_hasapu._id });

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();

    Licenses.insert({
      employee: employee_hasapu._id,
      rfid : "88888",
      details: [{
        type: "Land Clearing",
        id: "12345",
        agency: 'PT Flywing',
        oissue: new Date(),
        odue: new Date(year+1, month, date)
      }],
      team: employee_prass.team,
      created: new Date(),
      creator: user_pras._id
    });

    Licenses.insert({
      employee: employee_prass._id,
      rfid : "33223",
      details: [{
        type: "Dumping",
        id: "1144",
        agency: 'PT Dumper',
        oissue: new Date(),
        odue: new Date(year+1, month, date)
      }],
      team: employee_prass.team,
      created: new Date(),
      creator: user_pras._id
    });

    Licenses.insert({
      employee: employee_hasapu._id,
      rfid : "77777",
      "details" : [
        {
            type : "SIMPER",
            govdetails : {
                0 : {
                    id : "123",
                    issue : new Date(),
                    type : "A",
                    dateUntil : new Date(year+2, month, date)
                },
                1 : {
                    id : "456",
                    issue : new Date(),
                    type : "B1",
                    dateUntil : new Date(year+2, month, date)
                },
                2 : {
                    id : "789",
                    issue : new Date(),
                    type : "B2",
                    dateUntil : new Date(year+2, month, date)
                }
            },
            simperissue : new Date(),
            simperdue : new Date(year+1, month, date),
            simpertype : "Full"
        }
    ],
      team: employee_prass.team,
      created: new Date(),
      creator: user_pras._id
    });

  }
};
