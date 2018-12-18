import { Meteor } from 'meteor/meteor';
import { Assets } from '../../model/master/assets.model';
import { Employees } from '../../model/master/employees.model';

export default AssetSeeder = function () {
  if (Assets.find().count() == 0) {
    var user_pras = Meteor.users.findOne({ username: 'prasgema' });
    var employee_prass = Employees.findOne({ user: user_pras._id });

    Assets.insert({
      name :'Mobil Sedan',
      duedate : new Date(),
      desc : 'Operasional',
      serial : 'B1046WKM',
      type : 'Vehicle',
      status : 'a',
      age : 5,
      location : 'Head Office',
      qty :1,
      created: new Date(),
      creator: user_pras._id
    });

    Assets.insert({
      name :'Dump Truck',
      duedate : new Date(),
      desc : 'Operasional',
      serial : 'B9876RFS',
      type : 'Vehicle',
      status : 'a',
      age : 5,
      location :'Site 1',
      qty :1,
      created: new Date(),
      creator: user_pras._id
    });

    Assets.insert({
      name :'Helm Safety',
      duedate : new Date(),
      desc : 'Safety Equipment',
      serial : 'H0001',
      type : 'Uniform',
      status : 'a',
      age : 5,
      location :'Head Office',
      qty : 100,
      created: new Date(),
      creator: user_pras._id
    });

    Assets.insert({
      name :'Rompi Pertambangan',
      duedate : new Date(),
      desc : 'Safety Equipment',
      serial : 'R0001',
      type : 'Uniform',
      status : 'a',
      age : 5,
      location :'Head Office',
      qty : 100,
      created: new Date(),
      creator: user_pras._id
    });

  }
};
