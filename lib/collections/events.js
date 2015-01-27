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

Events.deny({
  update: function(userId, event, fieldNames, modifier) {
    var errors = validateEvent(modifier.$set);
    return errors.title || errors.url;
  }
});

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(Meteor.userId(), String);
    check(eventAttributes, {
      title: String,
      eventDate: Date
    });

    var errors = validateEvent(eventAttributes);
    if (errors.title || errors.eventDate)
      throw new Meteor.Error('invalid-event', "You must set a correct title and a date for your event");

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

validateEvent = function (event) {
  var errors = {};
  console.log(event.eventDate);
  if (!event.title)
    errors.title = "Please fill in an event title";
  if (!event.eventDate)
    errors.eventDate =  "Please enter a date";
  return errors;
}
