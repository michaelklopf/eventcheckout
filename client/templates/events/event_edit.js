Template.eventEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentEventId = this._id;

    var date = moment($(e.target).find('[name=eventDate]').val(), 'DD.MM.YYYY hh:mm')._d;

    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      eventDate: new Date(date)
    }

    Events.update(currentEventId, {$set: eventProperties}, function(error) {
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
};
