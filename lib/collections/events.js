Events = new Mongo.Collection('events');

Events.allow({
  update: function(userId, event) { return ownsDocument(userId, event); },
  remove: function(userId, event) { return ownsDocument(userId, event); }
});

Events.deny({
  update: function(userId, event, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'shareInPercent', 'eventDate').length > 0);
  }
});

Events.deny({
  update: function(userId, event, fieldNames, modifier) {
    var errors = validateEvent(modifier.$set);
    return errors.title || errors.shareInPercent || errors.eventDate;
  }
});

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(Meteor.userId(), String);
    check(eventAttributes, {
      title: String,
      shareInPercent: Number,
      eventDate: Date
    });
    console.log("Beign in Meteor method");
    var errors = validateEvent(eventAttributes);
    if (errors.title || errors.shareInPercent || errors.eventDate)
      throw new Meteor.Error('invalid-event', "You must set a correct title, the share you take and a date for your event");

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
  if (!event.title)
    errors.title = "Please fill in an event title";
  if (!event.shareInPercent || event.shareInPercent < 1 || event.shareInPercent > 100)
    errors.shareInPercent = "Please fill in the share you take"
  if (event.shareInPercent < 1)
    errors.shareInPercent = "You share is too low"
  if (event.shareInPercent > 100)
    errors.shareInPercent = "Your share is too high"
  if (!event.eventDate)
    errors.eventDate =  "Please enter a date";

  var eventManagersNotExisting = areEventManagersExistingUsers(event.eventManagers);
  if (eventManagersNotExisting.length > 0) {
    errors.eventManagers = "Following event managers are no existing users: " + eventManagersNotExisting;
  }

  return errors;
}

areEventManagersExistingUsers = function (eventManagers) {
  var eventManagersNotExisting = [];
  _.each(eventManagers, function(eventManager){
    var eventManagerNotFound = Meteor.users.findOne({username: eventManager});
    if (typeof eventManagerNotFound === "undefined") {
      eventManagersNotExisting.push(eventManager);
    }
  });
  return eventManagersNotExisting;
}
