Template.registerHelper('formatEventDate', function(context, options) {
  if(context)
    return moment(new Date(this.eventDate)).format('dddd DD.MM.YYYY, hh:mm');
});

Template.registerHelper('formatEventDateWithoutWeekday', function(context, options) {
  if(context)
    return moment(new Date(this.eventDate)).format('DD.MM.YYYY hh:mm');
});
