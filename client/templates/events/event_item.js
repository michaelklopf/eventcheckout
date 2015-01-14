Template.eventItem.helpers({
  day: function() {
    var date = new Date(this.eventDate);
    return date.getDate();
  },
  month: function() {
    var date = new Date(this.eventDate);
    return date.getMonth()+1;
  },
  year: function() {
    var date = new Date(this.eventDate);
    return date.getFullYear();
  },
  weekday: function() {
    var date = new Date(this.eventDate);
    return dayOfWeekAsString(date.getDay());
  },
  eventAtFormatted: function () {
    return moment(new Date(this.eventDate)).format('dddd DD.MM.YYYY, hh:mm');
  }
});

var dayOfWeekAsString = function(day) {
  return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
}
