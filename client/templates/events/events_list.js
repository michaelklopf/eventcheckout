Template.eventsList.helpers({
  events: function() {
    return Events.find({}, {sort: {eventDate: -1}});
  }
});
