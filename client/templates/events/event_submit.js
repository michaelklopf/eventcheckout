Template.eventSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var date = moment($(e.target).find('[name=eventDate]').val(), 'DD.MM.YYYY hh:mm')._d;

    var event = {
      title: $(e.target).find('[name=title]').val(),
      eventDate: date
    };

    event._id = Events.insert(event);
    Router.go('eventPage', event);
  }
});

Template.eventSubmit.rendered = function() {
  $('.datetimepicker').datetimepicker({
    format : 'DD.MM.YYYY HH:mm',
    use24hours: true,
    sideBySide: true
  });
}
