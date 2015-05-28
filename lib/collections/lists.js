Lists = new Mongo.Collection('lists');

Meteor.methods({
  listInsert: function(listAttributes) {
    check(Meteor.userId(), String);
    check(listAttributes, {
      eventId: String,
      author: String
    });

    var errors = validateList(listAttributes);
    if (errors.eventId || errors.author)
      throw new Meteor.Error('invalid-list', "You must set a correct author, event Id, and date.");

    var user = Meteor.user();

    var list = _.extend(listAttributes, {
      userId: user._id,
      submitted: new Date()
    });

    var listId = Lists.insert(list);

    return {
      _id: listId
    };
  }
});

validateList = function (list) {
  var errors = {};
  if (!list.eventId)
    errors.eventId = "Please fill in a related event id";

  if (!list.author)
    errors.author = "Please enter an author";

  return errors;
}
