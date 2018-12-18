import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({

  'auth.signup' : (registration) => {
    Accounts.createUser(registration);
    return true;
  },

  'auth.sendVerificationEmail' : (registration) => {
    registration._id = Meteor.users.findOne({ 'emails.address' : registration.email })._id;
    Meteor.call('emailVerified',registration);
  },

  'auth.addEmail' : (email) => {
    if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    }

    Accounts.addEmail(Meteor.userId(), email);
    Accounts.sendVerificationEmail(Meteor.userId());
  },

  'auth.removeEmail' : (email) => {
    if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    }
    Accounts.removeEmail(Meteor.userId(), email);
  },


  //verify email after user click email that has been sent
  'auth.verifiedEmail' : (id) => {
    Meteor.users.update(id , {
      $set: {
        'emails.0.verified': true
      }
    }, function (err, res){
      //console.log(err, res);
    });
  },

  'auth.checkEmailVerification' : (email) => {
    var user = Meteor.users.findOne({ 'emails.address' : email });
    if(user) return userVerified = user.emails[0].verified == true ? 'verified' : undefined;
    else throw new Meteor.Error(409,'your email is not registered');
  },

  'auth.resetPassword' : (oldPass,newPass) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Accounts.changePassword(oldPass, newPass);
  },

  'auth.forgotPassword' : (email) => {
    process.env.MAIL_URL = 'smtps://'+
    encodeURIComponent(smtp.username)+':'+
    encodeURIComponent(smtp.password)+'@'+
    encodeURIComponent(smtp.server)+':'+
    encodeURIComponent(smtp.port);
    found_user = Meteor.users.findOne({ 'emails.address' : email });
    if(found_user){
      Accounts.sendResetPasswordEmail( found_user, email);
          }
    },

  'auth.updateEmail' : (email) => {
     found_user = Meteor.users.findOne({ 'emails.address' : email })
    if(found_user){
    Meteor.users.update(found_user, {$set: {"emails.0.verified" :true}});
        }
      },

  'auth.selectTeam' : (teamId) => {
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: { currentTeam: teamId }
    }, function (err, res){
      //console.log(err, res);
    });
  }
});
