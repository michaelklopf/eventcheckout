Template.eventItem.helpers({
  ownEvent: function() {
    var findAdmin = _.find(this.admins, function(admin) { return admin.id == Meteor.userId(); });
    if (findAdmin !== undefined) {
      return findAdmin.id === Meteor.userId();
    }
    return this.userId === Meteor.userId();
  }
});
