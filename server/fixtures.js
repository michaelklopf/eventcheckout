var date1 = new Date("2014-09-28T11:00:00Z");
var date2 = new Date("2015-07-29T11:00:00Z");
var date3 = new Date("2015-06-21T10:00:00Z");
var date4 = new Date("2015-12-18T12:00:00Z");

if (Events.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var mkId = Meteor.users.insert({
    profile: { name: 'michael' }
  });
  var michael = Meteor.users.findOne(mkId);

  var jkId = Meteor.users.insert({
    profile: { name: 'julia' }
  });
  var julia = Meteor.users.findOne(jkId);

  var ev1id = Events.insert({
    title: 'Basar "Die Arche" Herbst 2014',
    userId: mkId._id,
    author: mkId.profile.name,
    feeInPercent: 0.20,
    //eventDate: 'Sun Sep 28 2014 11:00:00 GMT+0200 (CEST)'
    eventDate: date1
  });

  var ev2id = Events.insert({
    title: 'Basar "Die Arche" Frühjahr 2015',
    userId: mkId._id,
    author: mkId.profile.name,
    feeInPercent: 0.20,
    //eventDate: 'Sun Mar 29 2015 11:00:00 GMT+0200 (CEST)'
    eventDate: date2
  });

  var ev3id = Events.insert({
    title: 'Flohmarkt BRK Rosenmesse 2015',
    userId: jkId._id,
    author: jkId.profile.name,
    feeInPercent: 0.20,
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date3
  });

  var ev4id = Events.insert({
    title: 'Flohmarkt Weihnachten',
    userId: jkId._id,
    author: jkId.profile.name,
    feeInPercent: 0.20,
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date4
  });

  Lists.insert({
    listId: 1,
    eventId: ev1id,
    userId: michael._id,
    author: michael.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    list_items: {
      0: {
         price: '1',
         unit: 'euro',
         description: 'Stuffed teddy bear',
         customerId: '',
         cashierId: ''
      },
      1: {
         price: '2.5',
         unit: 'euro',
         description: 'Sweatshirt',
         customerId: '',
         cashierId: ''
      }
    }
  });

  Lists.insert({
    listId: 1,
    eventId: ev1id,
    userId: julia._id,
    author: julia.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000)
  });

  Lists.insert({
    listId: 1,
    eventId: ev2id,
    userId: michael._id,
    author: michael.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000)
  });

  Lists.insert({
    listId: 1,
    eventId: ev3id,
    userId: julia._id,
    author: julia.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000)
  });

  Lists.insert({
    listId: 1,
    eventId: ev4id,
    userId: julia._id,
    author: julia.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000)
  });
}
