/*
 * hasapu  09-06-2017 - made seeder
 */

import { Meteor } from 'meteor/meteor';


export default UserSeeder = function () {


  users = [{
    username : 'hasapu',
    email : 'hari.sakti.putra@gmail.com',
    password: 'secret',
    roles : ['admin'],
    profile : {
      name : 'Hari Sakti Putra',
      phone : '081322918441',
      image : '/images/user.png'
    },
  },
  {
    username : 'prasgema',
    email : 'pras@volantech.io',
    password: 'secret',
    roles : ['admin'],
    profile : {
      name : 'Prasetyo Gema',
      phone : '123242535',
      image : '/images/user.png'
    }
  },
  {
    username : 'masanam',
    email : 'masanam@volantech.io',
    password: 'secret',
    profile : {
      name : 'Masanam',
      phone : '123242535',
      image : '/images/user.png'
    }
  },
  {
    username : 'philipusmartin',
    email : 'martin@volantech.io',
    password: 'secret',
    profile : {
      name : 'Philipus Martin',
      phone : '123242535',
      image : '/images/user.png'
    }
  },
  {
    username : 'aryo',
    email : 'aryo@volantech.io',
    password: 'secret',
    profile : {
      name : 'Aryo Pradipta Gema',
      phone : '123242535',
      image : '/images/user.png'
    }
  },
  {
    username : 'tine',
    email : 'tine@volantech.io',
    password: 'secret',
    profile : {
      name : 'Christine Hermelina',
      phone : '123242535',
      image : '/images/user.png'
    }
  },
  {
    username : 'juli',
    email : 'juli@volantech.io',
    password: 'secret',
    profile : {
      name : 'Juliani Eva',
      phone : '123242535',
      image : '/images/user.png'
    }
  }];

  if (Meteor.users.find().count() === 0) {
    for (var i = 0; i<users.length ; i++) {
      Accounts.createUser({
        username: users[i].username,
        email: users[i].email,
        roles: users[i].roles,
        password: users[i].password,
        profile : users[i].profile
      });
    }
  }
};
