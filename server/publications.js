Meteor.publish('events', function(author) {
  return Events.find();
});
