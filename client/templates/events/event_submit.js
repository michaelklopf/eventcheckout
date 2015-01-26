Template.eventSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var date = moment($(e.target).find('[name=eventDate]').val(), 'DD.MM.YYYY hh:mm')._d;

    var event = {
      title: $(e.target).find('[name=title]').val(),
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
