var date1 = new Date("2014-09-28T11:00:00Z");
var date2 = new Date("2015-07-29T11:00:00Z");
var date3 = new Date("2015-06-21T10:00:00Z");
var date4 = new Date("2015-12-18T12:00:00Z");

if (Events.find().count() === 0) {
  var now = new Date().getTime();

  // create a couple new users
  var mkId = Meteor.users.insert({
    services : { "password" : { "bcrypt" : "$2a$10$hf2G504mvL.vW5bWBcr5YuYAgGBtJfRHWndQ9mH3KV2t7MTt234qu" }},
    username : "michael",
    profile: { name: 'michael' }
  });
  var michael = Meteor.users.findOne(mkId);

  var jkId = Meteor.users.insert({
    username : "julia",
    profile: { name: 'julia' }
  });
  var julia = Meteor.users.findOne(jkId);

  var kkId = Meteor.users.insert({
    username : "klaus",
    profile: { name: 'klaus' }
  });
  var klaus = Meteor.users.findOne(kkId);

  var tId = Meteor.users.insert({
    username : "thore",
    profile: { name: 'thore' }
  });
  var thore = Meteor.users.findOne(tId);

  var ev1id = Events.insert({
    title: 'Basar "Die Arche" Herbst 2014',
    userId: mkId,
    eventManagers: [
      julia.username
    ],
    cashiers: [
      { id: tId },
      { id: kkId }
    ],
    author: michael.profile.name,
    shareInPercent: 20,
    //eventDate: 'Sun Sep 28 2014 11:00:00 GMT+0200 (CEST)'
    eventDate: date1
  });

  var ev2id = Events.insert({
    title: 'Basar "Die Arche" Frühjahr 2015',
    userId: mkId,
    author: michael.profile.name,
    shareInPercent: 20,
    //eventDate: 'Sun Mar 29 2015 11:00:00 GMT+0200 (CEST)'
    eventDate: date2
  });

  var ev3id = Events.insert({
    title: 'Flohmarkt BRK Rosenmesse 2015',
    userId: jkId,
    eventManagers: [
      michael.username
    ],
    cashiers: [
      { id: tId },
      { id: kkId },
      { id: mkId }
    ],
    author: julia.profile.name,
    shareInPercent: 20,
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date3
  });

  var ev4id = Events.insert({
    title: 'Flohmarkt Weihnachten',
    userId: jkId,
    author: julia.profile.name,
    shareInPercent: 20,
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date4
  });

  Lists.insert({
    listId: 1,
    eventId: ev1id,
    userId: michael._id,
    author: michael.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    list_items: [
      {
        price: '1',
        unit: 'euro',
        description: 'Stuffed teddy bear',
        customerId: '',
        cashierId: ''
      },
      {
        price: '2.5',
        unit: 'euro',
        description: 'Sweatshirt',
        customerId: '',
        cashierId: ''
      }
    ]
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
