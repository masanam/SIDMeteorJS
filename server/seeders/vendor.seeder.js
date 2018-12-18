import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../model/master/vendors.model';
import { Teams } from '../../model/master/teams.model';
import { Employees } from '../../model/master/employees.model';


export default VendorSeeder = function () {
  var team_vti = Teams.findOne({ name: 'Volantech' }),
    user_aryo = Meteor.users.findOne({ username: 'aryo' }),
    user_pras = Meteor.users.findOne({ username: 'prasgema' }),
    employee_aryo = Employees.findOne({ team: team_vti._id, user: user_aryo._id }),
    employee_pras = Employees.findOne({ team: team_vti._id, user: user_pras._id });

  if (Vendors.find().count() == 0) {
    Vendors.insert({
      name: 'BUMA',
      legalName: 'PT Bukit Makmur Mandiri Utama',
      website: 'http://www.bumagroup.com/',
      industry: 'Mining Services',
      address: 'Jl. Pantai Indah Utara 2 Galeria Niaga Mediterania 2 Blok N No. 8 E-F Pantai Indah Kapuk',
      city: 'Jakarta Utara',
      region: 'DKI Jakarta',
      postalCode: '14460',
      country: 'Indonesia',
      employeeCount: 150000,
      annualRevenue: 150000000000,
      notes: 'Probably the best company ever?',
      team: team_vti._id,
      creator: employee_aryo._id,
      status: 'a'
    });

    Vendors.insert({
      name: 'PAMA',
      legalName: 'PT Pamapersada Nusantara',
      website: 'http://www.pamapersada.com/',
      industry: 'Mining Services',
      address: 'Jl. Rawagelam 1 No.9, Jakarta Industrial Estate Pulo Gadung',
      city: 'Jakarta TImur',
      region: 'DKI Jakarta',
      postalCode: '13930',
      country: 'Indonesia',
      employeeCount: 150000,
      annualRevenue: 150000000000,
      notes: 'Probably one the cooolest company ever?',
      team: team_vti._id,
      creator: employee_pras._id,
      status: 'a'
    });

    Vendors.insert({
      name: 'MBS',
      legalName: 'PT Pelayaran Mitra Bahari Sentosa',
      website: 'http://www.mitrabaharisentosa.co.id/',
      industry: 'Logistics',
      address: 'jln.Gubernur Soebarjo KOMP:PTBIC Kode Pos:70113',
      city: 'Banjarmasin',
      region: 'Kalimantan Selatan',
      postalCode: '70113',
      country: 'Indonesia',
      employeeCount: 150000,
      annualRevenue: 150000000000,
      notes: 'The best company ever?',
      team: team_vti._id,
      creator: employee_aryo._id,
      status: 'a'
    });
  }
};
