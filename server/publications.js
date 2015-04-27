Meteor.publish('events', function(author) {
  return Events.find();
});

Meteor.publish("users", function () {
    return Meteor.users.find();
});
