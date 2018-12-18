import { Meteor } from 'meteor/meteor';
import { Rfid } from '../../../model/identity/rfid.model';

// METHOD ENDPOINTS
Meteor.methods({
  'rfid.insert' (rfid) {
    // Make sure the user is logged in before inserting a rfid
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var input = {
      due: rfid.due,
      status: 'a',
      team: Meteor.user().currentTeam,
      created: new Date(),
      creator: Meteor.userId()
    };

    if(rfid.rfidList) {
      rfid.rfidList.forEach(function(r) {
        input.rfid = r;
        var res = Rfid.insert(input);
      });
    } else {
      input.rfid = rfid.rfid;

      if(rfid.employee) input.employee = rfid.employee;
      if(rfid.visitor) input.visitor = rfid.visitor;

      var res = Rfid.insert(input);
    }

    return res;

  },
  'rfid.update' (id, rfid) {
    check(id, String);

    var old = Rfid.findOne(id),
      history = {
        due: old.due
      },
      input = {
        rfid: old.rfid,
        due: rfid.due,
        team: old.team,
        status: 'a',
        history: old.history,
        created: old.created,
        updated: new Date(),
        creator: old.creator,
        updater: Meteor.userId()
      };

    // add old data to history
    if(!input.history) input.history = [];
    if(old.employee) history.employee = old.employee;
    if(old.visitor) history.visitor = old.visitor;
    input.history.push(history);

    // if it is an employee's rfid, add new employee
    if(old.employee) input.employee = rfid.employee;

    // if it is a visitor's rfid, add new employee
    if(old.visitor) input.visitor = rfid.visitor;

    var res = Rfid.update({ _id: id }, input);
    return res;
  },
  'rfid.remove' (id) {
    check(id, String);

    var res = Rfid.update(id, {
      $set: {status: 'x'}
    });
    return res;
  },
});
