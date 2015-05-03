Template.eventItem.helpers({
  ownEvent: function() {
    var findEventManager = _.find(this.eventManagers, function(eventManager) { return eventManager == Meteor.user().username; });
    if (findEventManager !== undefined) {
      return findEventManager === Meteor.user().username;
    }
    return this.userId === Meteor.userId();
  }
});
