Template.eventPage.helpers({  
  beingCashier: function() {
    var findCashier = _.find(this.cashiers, function(cashier) { return cashier == Meteor.user().username; });
    if (findCashier !== undefined) {
      return findCashier === Meteor.user().username;
    }
    return this.userId === Meteor.userId();
  },
  
  lists: function() {
    return Lists.find({eventId: this._id});
  }
});