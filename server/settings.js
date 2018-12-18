import { Accounts } from 'meteor/accounts-base';
import { DBSetting } from '../config/db.config';

Meteor.startup(() => {
  if (Meteor.settings) {
    //process.env.MONGO_URL = 'mongodb://[UN]:PW]@[host]:[port]/[dbName]'
    process.env.MONGO_URL = 'mongodb://localhost:3001/vauth';

    Object.assign(Accounts._options, Meteor.settings['accounts-phone']);
  //  SMS.twilio = Meteor.settings['twilio'];
  }
});
