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

    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      eventDate: $(e.target).find('[name=eventDate]').val()
    }

    if (eventProperties.eventDate === "")
      eventProperties.eventDate = moment().format('DD.MM.YYYY hh:mm');

    var errors = validateEvent(eventProperties);
    if (errors.title || errors.eventDate)
      return Session.set('eventSubmitErrors', errors);

    var date = moment(eventProperties.eventDate, 'DD.MM.YYYY hh:mm')._d;

    var event = {
      title: eventProperties.title,
      eventDate: new Date(date)
    };

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
