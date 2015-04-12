Template.eventSubmit.created = function() {
  Session.set('eventSubmitErrors', {});
}

Template.eventSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('eventSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('eventSubmitErrors')[field] ? 'has-error' : '';
  },
  dateNow: function() {
    return moment().format('DD.MM.YYYY hh:mm');
  }
});

Template.eventSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    // get event input data
    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      shareInPercent: $(e.target).find('[name=shareInPercent]').val(),
      eventDate: $(e.target).find('[name=eventDate]').val()
    }

    // when date is empty add current date
    if (eventProperties.eventDate === "")
      eventProperties.eventDate = moment().format('DD.MM.YYYY hh:mm');

    // validate inputs
    var errors = validateEvent(eventProperties);
    if (errors.title || errors.shareInPercent || errors.eventDate)
      return Session.set('eventSubmitErrors', errors);

    // pack date property in new form, the same for the share
    var date = moment(eventProperties.eventDate, 'DD.MM.YYYY hh:mm')._d;
    var share = parseInt(eventProperties.shareInPercent);

    // create event object from properties
    var event = {
      title: eventProperties.title,
      shareInPercent: share,
      eventDate: new Date(date)
    };

    // send event object to insert method
    Meteor.call('eventInsert', event, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      Router.go('eventPage', {_id: result._id});
    });
  }
});

Template.eventSubmit.rendered = function() {
  $('.datetimepicker').datetimepicker({
    format : 'DD.MM.YYYY HH:mm',
    use24hours: true,
    sideBySide: true
  });
}
