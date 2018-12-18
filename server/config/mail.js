
Meteor.startup(() => {

  smtp = {
    server : 'smtp.gmail.com',
    port : 465,
    username : 'bcesid@gmail.com',
    password : '5pd-LXu-4MC-82g'
  }

  emailEnv = {
    from : smtp.username,
    subject : '[SID] Sign up Invitation',
    text : 'http://127.0.0.1:3000/auth/signup/'
  }

  emailVerified = {
    from : smtp.username,
    subject : '[SID] Email Verification',
    text : 'http://127.0.0.1:3000/auth/verified/'
  }

  emailAddEmployee = {
    from : smtp.username,
    subject : '[SID] Email Notification',
    text : 'http://127.0.0.1:3000/auth/signin/'
  }

  emailReset = {
    from : smtp.username,
    subject : '[SID] Reset Password',
    text : 'http://127.0.0.1:3000/#/reset-password/'
  }

  Meteor.methods({

    mail_url : function() {
      process.env.MAIL_URL = 'smtps://'+
      encodeURIComponent(smtp.username)+':'+
      encodeURIComponent(smtp.password)+'@'+
      encodeURIComponent(smtp.server)+':'+
      encodeURIComponent(smtp.port);
    },

    emailInvitation : function(invitation,email) {
      MailStatus = Npm.require('fibers/future');
      var mailStatus = new MailStatus();

      Meteor.call('mail_url', function(err, results){
        try {
          Email.send({
            to: email ? email : invitation.email,
            from: emailEnv.from,
            subject: emailEnv.subject,
            text: invitation.uninvited ? 'Sorry, your invitation has been canceled' : invitation.message+'\n\n'+emailEnv.text+invitation._id
          });
        } catch(err) {
          mailStatus.throw(err);
        } finally {
          results = true;
          invitation.email = undefined;
          mailStatus.return(results);
        }
      });
      return mailStatus.wait();

    },

    emailVerified : function(registration) {
      Meteor.call('mail_url', function(){
        Email.send({
          to: registration.email,
          from: emailEnv.from,
          subject: emailVerified.subject,
          text:
            'To verify your email address visit the following link:\n\n '+emailVerified.text+registration._id+ '\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team.\n\n Regards \n\n Administrator'        });
      });
    },

    emailAddEmployee : function(account) {
      MailStatus = Npm.require('fibers/future');
      var mailStatus = new MailStatus();

      Meteor.call('mail_url', function(err, results){
        try {
          Email.send({
            to: account.email,
            from: emailEnv.from,
            subject: emailAddEmployee.subject,
            text:
              'You have been invited to sign-in through Alteos application. Please sign-in to '+ emailAddEmployee.text +' with your pre-setup account below :\n\n'
              +'Email : '+ account.email +'\n'
              +'Password : '+ account.password +'\n\n'
              +'Regards, \n\n Administrator'
          });
        } catch(err) {
          mailStatus.throw(err);
        }
      });
    }

  });


});
