Template.eventSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var event = {
      url: $(e.target).find('[name=title]').val(),
      eventDate: $(e.target).find('[name=eventDate]').val()
    };

    event._id = Events.insert(event);
    Router.go('eventPage', event);
  }
});

Template.eventSubmit.rendered = function() {
  $('.datetimepicker').datetimepicker({
    format : 'DD.MM.YYYY HH:mm',
    use24hours: true
  });
}
