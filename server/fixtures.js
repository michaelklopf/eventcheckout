if (Events.find().count() === 0) {
  Events.insert({
    title: 'Basar "Die Arche" Herbst 2014',
    eventDate: 'Sun Sep 28 2014 11:00:00 GMT+0200 (CEST)'
  });

  Events.insert({
    title: 'Basar "Die Arche" Frühjahr 2015',
    eventDate: 'Sun Mar 29 2015 11:00:00 GMT+0200 (CEST)'
  });

  Events.insert({
    title: 'Flohmarkt BRK Rosenmesse 2015',
    eventDate: 'Sun Jun 21 2015 10:00:00 GMT+0200 (CEST)'
  });
}
