Events = new Mongo.Collection('events');

Events.allow({
  update: function(userId, event) { return ownsDocument(userId, event); },
  remove: function(userId, event) { return ownsDocument(userId, event); }
});

Events.deny({
  update: function(userId, event, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'eventDate').length > 0);
  }
});

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(Meteor.userId(), String);
    check(eventAttributes, {
      title: String,
      eventDate: Date
    });

    var user = Meteor.user();

    var event = _.extend(eventAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var eventId = Events.insert(event);

    return {
      _id: eventId
    };
  }
});
