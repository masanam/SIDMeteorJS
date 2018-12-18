import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

  'user.updateProfile' (newProfile) {
      if (!Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(Meteor.userId(), {
        $set: {
          username: newProfile.username,
          'profile.name' : newProfile.profile.name,
          'profile.phone': newProfile.profile.phone,
          image: newProfile.profile.image
        }
      });
    },

    'user.addEmail' (email) {
      if (!Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
      }

      Accounts.addEmail(Meteor.userId(), email);
      Meteor.call('mail_url', function(){
        Email.send({
           to: email,
           from: emailEnv.from,
          subject: emailVerified.subject,
          text:
            'To verify your email address visit the following link:\n\n '+emailVerified.text+Meteor.userId()+ '\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team.\n\n Regards \n\n Adminisrator'        });
      });

     },

    'user.removeEmail' (email) {
      if (!Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
      }

      Accounts.removeEmail(Meteor.userId(), email);
    }



});
