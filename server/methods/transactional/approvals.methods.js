import { Meteor } from 'meteor/meteor';
import { Approvals } from '../../../model/transactional/approvals.model';
import { ApprovalHistories } from '../../../model/transactional/approval-histories.model';

// semua models yang perlu approval diimport disini
import { Employees } from '../../../model/master/employees.model';
import { Assets } from '../../../model/master/assets.model';
import { Visitors } from '../../../model/master/visitors.model';
//import { Licenses } from '../../model/licenses.model';
import { Vendors } from '../../../model/master/vendors.model';


// METHOD ENDPOINTS
Meteor.methods({
  'approvals.request' (model, ref) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var employee = Meteor.employee(),
      team = Meteor.team()
      scheme = team.approvalSchemes[model],
      sequence = evaluateCurrent(model, ref, scheme), // cari ini sequence apa dan siapa aja yang harusnya approve
      escalate = sequenceCompletion(scheme, sequence); // find whether this sequence has been completed

    // sequence selanjutnya, minta approvals
    if(escalate) escalateSequence(scheme, sequence);
  },

  'approvals.respond' (id, response) {
    var employee = Meteor.employee(),
      team = Meteor.team(),
      approval = Approvals.findOne(id);

    if(approval.approver !== employee._id)
      throw new Meteor.Error(403, 'Error 403: Forbidden', 'This is not your approval record');

    Approvals.update(id, {
      $set: {
        approval: response,
        approved: Date.now()
      }
    });

    ApprovalHistories.insert({
      model: approval.model,
      ref: approval.ref,
      sequence: approval.sequence,
      approver: employee._id,
      approval: response,
      approved: Date.now(),
      //notes:
    });

    // if response is negative, put the final approval as declined
    if(response !== 'a') finalApproval(approval.model, approval.ref, response);
    else {
      var scheme = team.approvalSchemes[approval.model],
        sequence = evaluateCurrent(approval.model, approval.ref, scheme), // cari ini sequence apa dan siapa aja yang harusnya approve
        escalate = sequenceCompletion(scheme, sequence); // find whether this sequence has been completed;

      // sequence selanjutnya, minta approvals
      if(escalate){
        cleansePending(approval.model, approval.ref, response);
        escalateSequence(scheme, sequence);
      }
    }
  },
});

function evaluateCurrent (model, ref, scheme) {
  // find latest approval records to know its sequence
  // determine current sequence and put all approval records associated to it
  var approvals = Approvals.find({ model: model, ref: ref },{ $sort: { sequence: 1 } }).fetch(),
    lastSequence = approvals.length === 0 ? 0 : approvals.slice(-1).pop().sequence;

  // return an object containing all approval records of current sequence
  return {
    records: approvals,
    sequence: lastSequence,
    model: model,
    ref: ref
  };
}

function sequenceCompletion (scheme, sequence) {
  // from populated records, count number of users approving
  var currentScheme = scheme.sequences[sequence.sequence],
    numApproval = sequence.records.filter((a) => { return a.approval === 'a' && a.sequence === sequence.sequence }).length,
    eligibleEmployees = Employees.find({ roles: currentScheme.role, team: Meteor.team()._id, status: 'a' }).fetch(),
    numRequired;

  if(eligibleEmployees.length === 0) return true;

  // pastiin semua approval record sudah sesuai sama eligible employees
  // kalau belom semua yang eligible dimasukin, masukin aja
  eligibleEmployees.forEach((ee) => {
    var idx = sequence.records.findIndex((r) => {
      return r.approver === ee._id;
    });
    if(idx < 0) sendRequest(sequence.model, sequence.ref, sequence.sequence, ee);
  });

  // tentuin jumlah orang yang harus approve di sequence ini
  // angka yang requred ini mengabaikan orang yang dulu pegang 1 role, tapi sudah gak aktif
  switch(currentScheme.type){
    case 'a' : numRequired = eligibleEmployees.length; break;
    case 'o' : numRequired = 1; break;
    default: numRequired = currentScheme.type;
  }

  // bandingin number of users approving itu sama syarat yang ada di sequences
  if(numApproval >= numRequired) return true;
  return false;
}

function cleansePending (model, ref, response) {
  var status;

  switch(response) {
    case 'a' : status = 'y'; break;
    default : status = 'n'; break;
  }

  // make all pending into auto-approve / auto-reject
  Approvals.update({
    model: model, ref: ref, approval: 'p'
  }, {
    $set: { approval: status, approved: Date.now() }
  }, {
    multi: true
  });
}

function escalateSequence (scheme, sequence) {
  // simpen record next sequence dan eligible employee disini
  var curr = sequence.sequence,
    nextSequence = false,
    eligibleEmployees = [];

  // kalau next sequence itu ternyata gak ada yang eligible, escalate terus
  while(!eligibleEmployees.length && curr < scheme.sequences.length) {
    nextSequence = scheme.sequences[++curr];

    if(nextSequence) // kalo gak ada next sequence, gak usah cari orang
      eligibleEmployees = Employees.find({ roles: nextSequence.role, team: Meteor.team()._id, status: 'a' }).fetch();
  }

  // kalau ternyata sequencenya sampe abis masih belom dapet yang eligible
  // pasti ini udah end of line (gak ad yang bisa approve), lansgung auto-approve
  if(curr == scheme.sequences.length) finalApproval(sequence.model, sequence.ref, 'a')

  // kalau udah eligible semua
  eligibleEmployees.forEach((ee) => {
    sendRequest(sequence.model, sequence.ref, curr, ee);
  });
}

function sendRequest (model, ref, sequence, approver) {
  Approvals.insert({
    model: model,
    ref: ref,
    approver: approver._id,
    approval: 'p',
    sequence: sequence,
    team: Meteor.team()._id,
    status: 'a',
    created: Date.now()
  });
}

function sendReminders () {
  console.log('kirim reminder ke semua orang yang ada disini');
}

function finalApproval (model, ref, approval) {
  var collection;

  switch(model) {
    case 'Employee' : collection = Employees; break;
    case 'Asset' : collection = Assets; break;
    case 'Visitor' : collection = Visitors; break;
    case 'License' : collection = Licenses; break;
    case 'Vendor' : collection = Vendors; break;
  }

  if(!collection) return 'error';
  else {
    collection.update(ref, {
      $set: { status: approval }
    });
  }
}
