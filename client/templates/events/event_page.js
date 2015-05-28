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
  },

  ownLists: function() {
    return Lists.find({eventId: this._id, author: Meteor.user().username});
  }
});

Template.eventPage.events({
  'click #addList': function(e) {
    e.preventDefault();

    // get list input data
    var list = {
      eventId: this._id,
      author: Meteor.user().username
    }

    // send event object to insert method
    Meteor.call('listInsert', list, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
    });
  }
});
