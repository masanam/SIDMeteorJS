import { Meteor } from 'meteor/meteor';
import { Audits } from '../../model/compliance/audits.model';
import { Employees } from '../../model/master/employees.model';

export default AuditSeeder = function () {
  if (Audits.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    var user_hasapu = Meteor.users.findOne({ username: 'hasapu' });
    var employee_hasapu = Employees.findOne({ user: user_hasapu._id });

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();

    Audits.insert({
      type: 'o',
      slated: new Date(),
      due: new Date(year+1, month, date),
      observer: 'Helena Blavatsky',
      observed: 'Kiyohime',
      deptInCharge: 'Chaldean Soldier',
      location: 'Training Center',
      findings: {
          0 : 'A',
          5 : 'F'
      },
      desc: 'Bahan ascension',
      category: 'A',
      action: 'Laporkan kepada Chief Officer',
      photo: '',
      status: 'n',
      created: new Date(),
      creator: user_pras._id,
      editors: [employee_prass._id, employee_hasapu._id],
      viewers: [employee_prass._id, employee_hasapu._id],
      team:employee_prass.team
    });

    Audits.insert({
      type: 'i',
      slated: new Date(),
      due: new Date(year+1, month, date),
      inspector: 'Nikola Tesla',
      inspected: 'Thomas A. Edison',
      deptInCharge: 'Chaldean Soldier',
      location: 'Office',
      findings: {
          1 : 'B',
          5 : 'F',
          6 : 'G'
      },
      desc: 'Bahan baku alat elektronik',
      category: 'B',
      action: 'Simpan untuk modal penelitian',
      photo: '',
      status: 'n',
      created: new Date(),
      creator: user_pras._id,
      editors: [employee_prass._id, employee_hasapu._id],
      viewers: [employee_prass._id, employee_hasapu._id],
      team:employee_prass.team
    });

    Audits.insert({
      type: 'o',
      slated: new Date(),
      due: new Date(year+1, month, date),
      observer: 'Minamoto no Yorimitsu',
      observed: 'Shuten Douji',
      deptInCharge: 'Japanese Legend',
      location: 'Head Office',
      findings: {
          2 : 'C'
      },
      desc: 'Minuman keras iblis',
      category: 'B',
      action: 'Ajak duel',
      photo: '',
      status: 'n',
      created: new Date(),
      creator: user_pras._id,
      editors: [employee_prass._id, employee_hasapu._id],
      viewers: [employee_prass._id, employee_hasapu._id],
      team:employee_prass.team
    });

    Audits.insert({
      type: 'i',
      slated: new Date(),
      due: new Date(year+1, month, date),
      inspector: 'Anne Bonnie',
      inspected: 'Mary Read',
      deptInCharge: 'Pirates',
      location: 'Site',
      findings: {
          3 : 'D',
          5 : 'F'
      },
      desc: 'Harta karun bersejarah',
      category: 'D',
      action: 'Buka dengan hati-hati',
      photo: '',
      status: 'n',
      created: new Date(),
      creator: user_pras._id,
      editors: [employee_prass._id],
      viewers: [employee_prass._id, employee_hasapu._id],
      team:employee_prass.team
    });

  }
};
