import { Meteor } from 'meteor/meteor';
import { Teams } from '../../model/master/teams.model';

export default TeamSeeder = function () {

  teams = [
    {
        "name" : "Volantech",
        "website" : "volantech.io",
        "icon" : "rocket",
        "city" : "Jakarta",
        "country" : "Indonesia",
        "industry" : "Technology",
        "about" : "Corporation created by desire",
        "facilities" : ["All Sites", "Lati", "Binuangan"],
        "clearanceTypes" : ["Enter Operation/ Transhipment", "Pengawas Land Clearing", "KIMPER",
                            "Commissioning/ Recommissioning", "SIMPER", "Pengawas Penimbunan"]
    }, {
        "name" : "Anakmuda",
        "website" : "anakmuda.net",
        "icon" : "send",
        "city" : "Jakarta",
        "country" : "Indonesia",
        "industry" : "People Development",
        "about" : "One-stop youth development"
    }, {
        "name" : "RCP Convection",
        "website" : "rcp-convection.com",
        "icon" : "needle",
        "city" : "Jakarta",
        "country" : "Indonesia",
        "industry" : "Garment",
        "about" : "One-stop solution for clothing & fashion"
    }
  ];

  if (Teams.find().count() === 0) {

    teams.forEach(function(t) {
      Teams.insert(t);
    });
  }
};
