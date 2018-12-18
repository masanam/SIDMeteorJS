import { Meteor } from 'meteor/meteor';
import { Commisionings } from '../../model/compliance/commisionings.model';
import { Employees } from '../../model/master/employees.model';
import { Assets } from '../../model/master/assets.model';

export default CommisioningSeeder = function () {
  if (Commisionings.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    var asset_mobil = Assets.findOne({ name: "Helm Safety" });

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();

    Commisionings.insert({
      asset: asset_mobil.name,
      slated: new Date(),
      due: new Date(year+1, month, date),
      inspector: 'James Moriarty',
      responsiblecompany: 'Professors United',
      location: 'Site',
      doctype: {
        2 : "T3",
        4 : "T5"
      },
      accessarea: 'Location 1',
      status: 'd',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Commisionings.insert({
      asset: asset_mobil.name,
      slated: new Date(),
      due: new Date(year+1, month, date),
      inspector: 'Sherlock Holmes',
      responsiblecompany: 'Professors United',
      location: 'Location 1',
      doctype: {
        1 : "T2",
        2 : "T3",
        3 : "T4"
      },
      accessarea: 'Location 1',
      status: 'd',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

    Commisionings.insert({
      asset: asset_mobil.name,
      slated: new Date(),
      due: new Date(year+1, month, date),
      inspector: 'Edmond Dantes',
      responsiblecompany: 'Actor',
      location: 'Site',
      doctype: {
        3 : "T4",

      },
      accessarea: 'Site',
      status: 'g',
      created: new Date(),
      creator: user_pras._id,
      team:employee_prass.team
    });

  }
};
