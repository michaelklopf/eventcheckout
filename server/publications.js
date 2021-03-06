Meteor.publish('events', function(author) {
  return Events.find();
});

Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {'username': 1}});
});

Meteor.publish("lists", function() {
  return Lists.find();
});