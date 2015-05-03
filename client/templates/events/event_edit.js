Template.eventEdit.created = function() {
  Session.set('eventEditErrors', {});
}

Template.eventEdit.helpers({
  errorMessage: function(field) {
    return Session.get('eventEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('eventEditErrors')[field] ? 'has-error' : '';
  }
});

Template.eventEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentEventId = this._id;

    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      shareInPercent: $(e.target).find('[name=shareInPercent]').val(),
      eventManagers: $("#eventManagers").tagsinput('items'),
      cashiers: $("#cashiers").tagsinput('items'),
      eventDate: $(e.target).find('[name=eventDate]').val()
    }

    var errors = validateEvent(eventProperties);
    if (errors.title || errors.shareInPercent || errors.eventDate || errors.eventManagers || errors.cashiers)
      return Session.set('eventEditErrors', errors);

    var date = moment(eventProperties.eventDate, 'DD.MM.YYYY hh:mm')._d;
    var share = parseInt(eventProperties.shareInPercent);

    var event = {
      title: eventProperties.title,
      shareInPercent: share,
      eventManagers: $("#eventManagers").tagsinput('items'),
      cashiers: $("#cashiers").tagsinput('items'),
      eventDate: new Date(date)
    }

    Events.update(currentEventId, {$set: event}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('eventPage', {_id: currentEventId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentEventId = this._id;
      Events.remove(currentEventId);
      Router.go('eventsList');
    }
  }
});

Template.eventEdit.rendered = function() {
  $('.datetimepicker').datetimepicker({
    format : 'DD.MM.YYYY HH:mm',
    use24hours: true,
    sideBySide: true
  });

  // Initialise tags input
  $('.tags').tagsinput({
      /*
      typeahead: {
          source: function(query) {
              return ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'];
          }
      }
      */
  });
};
