import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
   'tasks.insert'(text) {
       check(text, string);

       if (! this.userId) {
           throw new Meteor.Error('not-authorized');
       }

       Tasks.insert({
           text,
           createdAt: new Date(),
           owner: this.userId,
           username: Meteor.users.findOne(this.userId).username
       });
   },
   'task.remove'(taskId) {
       check(taskId, String);
       Tasks.remove(taskId);
   },
   'task.setChecked'(taskId, setChecked) {
       check(taskId, String);
       check(setChecked, Boolean);

       Tasks.update(taskId, { $set: { checked: setChecked } });
   }
});