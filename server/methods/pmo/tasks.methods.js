import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../../model/pmo/tasks.model';

Meteor.methods({
  'tasks.insert' (task, callback) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Tasks.insert({
      title: task.title,
      notes : task.notes,
      project : task.project,
      milestone : task.milestone,
      deadline : task.deadline,
      status : task.status,
      team : Meteor.team()._id,
      creator: Meteor.userId(),
      created: new Date(),
      assignees: [ Meteor.userId() ],
    });

    return res;
  },
  'tasks.update' (task, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var res = Tasks.update(task._id, {
      $set: {
        title: task.title,
        notes : task.notes,
        project : task.project,
        milestone : task.milestone,
        deadline : task.deadline,
        status : task.status,
        updater: Meteor.userId(),
        updated: new Date(),
        assignees: task.assignees,
      }
    });

    return res;
  }
});