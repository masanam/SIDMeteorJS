import { Meteor } from 'meteor/meteor';
import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';
import { Vendors } from '../../model/master/vendors.model';

export default ContractedEmployeeSeeder = function () {

  if (Employees.find({ vendor: { $exists: true, $not: {$size: 0} } }).count() == 0) {
      var user_tine = Meteor.users.findOne({ username: 'tine' }),
        team_vti = Teams.findOne({ name: 'Volantech' }),
        vendor_buma = Vendors.findOne({ name: 'BUMA' });

      var user_juli = Meteor.users.findOne({ username: 'juli' }),
        vendor_pama = Vendors.findOne({ name: 'PAMA' });


    Employees.insert({
      team: team_vti._id,
      user: user_tine._id,
      status: 'a',
      name: 'Christine Hermelina',
      surname: '',
      employeeId: 'VTI-1',
      gender: 'm',
      rfid: '',
      vendor: vendor_buma._id
    });

    Employees.insert({
      team: team_vti._id,
      user: user_juli._id,
      status: 'a',
      name: 'Juli',
      surname: '',
      employeeId: 'VTI-1',
      gender: 'm',
      rfid: '',
      vendor: vendor_pama._id
    });

}
}
