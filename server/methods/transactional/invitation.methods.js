import { Meteor } from 'meteor/meteor';
import { Employees } from '../../../model/master/employees.model';
import { Invitation } from '../../../model/transactional/invitation.model';

// METHOD ENDPOINTS
Meteor.methods({
  'invitation.insert' (invitation, callback) {

    var emailAlreadyExist = {};
    var emailInvitation = {};
    var emailAlreadyReg = [];
    var emailAlreadyInvite = [];

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    //cek list email already exist

    if(invitation.emailList[0]) {

      invitation.emailList.forEach((email) => {
        emailAlreadyExist = Meteor.users.find({ "emails.address": email }).count();
        emailInvitation = Invitation.find({ email:email }).count();
        if(emailInvitation !== 0) {
          emailAlreadyInvite.push(email);
        }
        else if(emailAlreadyExist !== 0) {
          emailAlreadyReg.push(email);
        }
      });

      if(emailAlreadyInvite[0] && emailAlreadyReg[0]) {
        throw new Meteor.Error(403, emailAlreadyInvite+(emailAlreadyInvite.length>1 ? " are " : " is ")+"already invited and "
        +emailAlreadyReg+(emailAlreadyReg.length>1 ? " are " : " is ")+"already registered");
      }
      else if(emailAlreadyInvite[0]) {
        throw new Meteor.Error(403, emailAlreadyInvite+(emailAlreadyInvite.length>1 ? " are " : " is ")+"already invited");
      }
      else if(emailAlreadyReg[0]) {
        throw new Meteor.Error(403, emailAlreadyReg+(emailAlreadyReg.length>1 ? " are " : " is ")+"already registered");
      }
      else {
        invitation.emailList.forEach((email) => {
          Invitation.insert({
            email: email,
            message: invitation.message,
            team : Meteor.team()._id,
            invitation_time : new Date(),
            creator : Meteor.userId(),
            status : 'p'
          }, (error, callback) => {
            invitation._id = callback;
            Meteor.call('emailInvitation',invitation,email, (err,results) => {
              Invitation.update(callback, {
                $set: {
                  status: err ? 'f' : 's',
                }
              });
            });
          });
        });
      }



    } else {
      emailAlreadyExist = Meteor.users.find({ "emails.address": invitation.email }).count();
      emailInvitation = Invitation.find({ email:invitation.email }).count();

      if(emailInvitation !== 0)
        throw new Meteor.Error(403, "this email is already invited");
      else {
        if(emailAlreadyExist !== 0)
          throw new Meteor.Error(403, "email already registered");
        else {
          Invitation.insert({
            email: invitation.email,
            message: invitation.message,
            team : Meteor.team()._id,
            invitation_time : new Date(),
            creator : Meteor.userId(),
            status : 'p'
          }, (error, callback) => {
            invitation._id = callback;
            Meteor.call('emailInvitation',invitation, (err,results) => {
              Invitation.update(callback, {
                $set: {
                  status: err ? 'f' : 's',
                }
              });
            });
          });
        }
      }
    }

  },

  'invitation.resend' (id, invitation) {

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.call('emailInvitation',invitation, (err,results) => {
      Invitation.update(id, {
        $set: {
          status: err ? 'f' : 's',
        }
      });
    });
  },

  'invitation.uninvited' (id, invitation) {
    invitation.uninvited = true;

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.call('emailInvitation',invitation, (err,results) => {
      Invitation.update(id, {
        $set: {
          status: err ? 'f' : 'u',
        }
      });
    });
  },

});
