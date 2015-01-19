Template.eventsList.helpers({
  futureEvents: function() {
    var currentDate = new Date();
    return Events.find({"eventDate" : {"$gte": currentDate}}, {sort: {eventDate: 1}});
  },
  currentEvents: function() {
    var lastFortnightDate = new Date(moment().subtract(14, 'days').calendar());
    return Events.find({"eventDate" : {"$gte": lastFortnightDate}}, {sort: {eventDate: 1}});
  },
  events: function() {
    return Events.find({}, {sort: {eventDate: 1}});
  }
});
