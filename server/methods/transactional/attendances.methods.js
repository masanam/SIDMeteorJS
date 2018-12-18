import { Meteor } from 'meteor/meteor';
import { Attendances } from '../../../model/transactional/attendances.model';
import { Employees } from '../../../model/master/employees.model';

// METHOD METHODS
Meteor.methods({

  'attendances.insert' (att) {
    var res = Attendances.insert({
      employee_id:att.employees_id,
      status:att.status,
      createdAt: new Date(),
      team:att.team
    });
    return res;
  },

  'attendances.remove' (attendanceId) {
    check(attendanceId, String);

    const attendances = Attendances.findOne(attendanceId);
    if (attendance.private && attendance.owner !== Meteor.userId()) {
      // If the staff is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    var res = Attendances.update(attendanceId, {
      $set: {status: 'x'}
    });
    return res;
  },

  'attendances.totalHours' (id, slated, due){
    var filter  = {
      employee: id,
      date:{
        $gte : slated,
        $lt  : due
        }
    };

    return Attendances.aggregate([
       { $match : filter
       },
       { $project: {
          employee : 1, difference : { $subtract:['$out', '$in'] }
        }
       },
       { $group :
         { _id: '$employee', totalHours : { $sum : '$difference' }}
       }
    ])

  },

  'attendances.absence' (q){

    var filter = {
      status: q.status,
      team: q.team
    };

    if(q.name)
      filter.name = new RegExp(q.name,'i');

    return Employees.aggregate([
      {
        $lookup:
          {
            from: "attendances",
            localField: "_id",
            foreignField: "employee",
            as: "absences"
          }
      },
      {
        $match: filter
      },
      {
        $limit: q.limit
       },
      {
        $skip: q.skip
      },
      {
        $project:
        {
          _id:1,
          name:1,
          date: {
            $filter: {
               input: "$absences.date",
               as: "absence",
               cond: { $and: [
                { $gte: [ "$$absence", q.slated ] },
                { $lt: [ "$$absence", q.due ] }
              ]}
            }
          }
        }
      }
    ])
  },

  'attendances.vendors' (q){

    var filter = {
      team: q.team,
      vendor: { $exists: true },
      date:{
        $gte : q.slated,
        $lt  : q.due
        }
    };

    if(q.vendor)
      filter.vendor = q.vendor;

    return Attendances.aggregate([
      {
        $lookup:
          {
            from: "vendors",
            localField: "vendor",
            foreignField: "_id",
            as: "performanceVendors"
          }
      },
      { $match: filter },
      { $limit: q.limit },
      { $skip: q.skip },
      { $project: {
         data: '$performanceVendors.legalName',
         vendor: 1,
         difference : { $subtract:['$out', '$in'] }
       }
      },
      { $group :
        { _id: '$vendor', totalHours : { $sum : '$difference' }, vendorName: {$first: '$data'} }
      }

    ])
  },

  'attendances.vendorsCount' (q){

    var filter = {
      team: q.team,
      vendor: { $exists: true },
      date:{
        $gte : q.slated,
        $lt  : q.due
        }
    };

    if(q.vendor)
      filter.vendor = q.vendor;

    return Attendances.aggregate([
      { $match: filter },
      { $project: {
         vendor: 1
       }
      },
      { $group :
        { _id: '$vendor'}
      }

    ])
  }

});
