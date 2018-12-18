import { Meteor } from 'meteor/meteor';
import { Investigations } from '../../model/compliance/investigations.model';
import { Employees } from '../../model/master/employees.model';

export default InvestigationSeeder = function () {
  if (Investigations.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    Investigations.insert({
      slated: new Date(),
      name: 'Leonardo Da Vinci',
      nickname: 'Da Vinci',
      deptInCharge: 'Chaldean Soldier',
      position: 'Supervisor',
      phone: '08112322113',
      location: 'Koordinat (329,900)',
      victim: 20,
      chronology: 'Menggambar Monalisa secara perfect',
      effect: 'Jadi terkenal',
      action: 'Kenangi dia',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Investigations.insert({
      slated: new Date(),
      name: 'Jeanne D\'Arc',
      nickname: 'Jeanne',
      deptInCharge: 'France Heroes',
      position: 'Director',
      phone: '08112322113',
      location: 'Koordinat (80,290)',
      victim: 5,
      chronology: 'Dibakar hidup-hidup oleh masyarakat',
      effect: 'Menjadi saint',
      action: 'Berdoalah',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Investigations.insert({
      slated: new Date(),
      name: 'Medea',
      nickname: 'Medea',
      deptInCharge: 'Chaldean Soldier',
      position: 'Manager',
      phone: '08112332113',
      location: 'Koordinat (104,100)',
      victim: 18,
      chronology: 'Membuat patung berhala',
      effect: 'Orang-orang sekitar menjadi berhala',
      action: 'Usir dia',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

  }
};
