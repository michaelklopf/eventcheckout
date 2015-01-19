var date1 = new Date("2014-09-28T11:00:00Z");
var date2 = new Date("2015-03-29T11:00:00Z");
var date3 = new Date("2015-06-21T10:00:00Z");
var date4 = new Date("2015-12-18T12:00:00Z");

if (Events.find().count() === 0) {
  Events.insert({
    title: 'Basar "Die Arche" Herbst 2014',
    //eventDate: 'Sun Sep 28 2014 11:00:00 GMT+0200 (CEST)'
    eventDate: date1
  });

  Events.insert({
    title: 'Basar "Die Arche" Frühjahr 2015',
    //eventDate: 'Sun Mar 29 2015 11:00:00 GMT+0200 (CEST)'
    eventDate: date2
  });

  Events.insert({
    title: 'Flohmarkt BRK Rosenmesse 2015',
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date3
  });

  Events.insert({
    title: 'Flohmarkt Weihnachten',
    //eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
    eventDate: date4
  });
}
