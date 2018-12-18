import { Meteor } from 'meteor/meteor';
import { Hazards } from '../../model/compliance/hazards.model';
import { Employees } from '../../model/master/employees.model';

export default HazardSeeder = function () {
  if (Hazards.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    Hazards.insert({
      type: 'f',
      date: new Date(),
      location: 'jakarta',
      danger: 'kebakaran',
      action: 'nikmatin aja',
      status: 'a',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Hazards.insert({
      type: 'f',
      date: new Date(2017,7,12),
      location: 'Bandung',
      danger: 'kebanjiran',
      action: 'renang aja renag',
      status: 'n',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Hazards.insert({
      type: 'g',
      date: new Date(2017,7,13),
      location: 'jakarta',
      danger: 'raba-raba kucing',
      violator: 'michael',
      vdesc: 'meraba raba kucing dengan bejatnya',
      action: 'kebiri aja',
      status: 'a',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Hazards.insert({
      type: 'g',
      date: new Date(2017,7,13),
      location: 'malaysia',
      danger: 'bunuh mantan',
      violator: 'bunga',
      vdesc: 'membunuh mantan sebelum meminta maaf',
      action: 'maklumin aja',
      status: 'a',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

  }
};
