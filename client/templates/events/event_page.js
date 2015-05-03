Template.eventPage.helpers({
  ownEvent: function() {
    var findEventManager = _.find(this.eventManagers, function(eventManager) { return eventManager == Meteor.user().username; });
    if (findEventManager !== undefined) {
      return findEventManager === Meteor.user().username;
    }
    return this.userId === Meteor.userId();
  },
  
  beingCashier: function() {
    var findCashier = _.find(this.cashiers, function(cashier) { return cashier == Meteor.user().username; });
    if (findCashier !== undefined) {
      return findCashier === Meteor.user().username;
    }
    return this.userId === Meteor.userId();
  }
});