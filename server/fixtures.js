if (Events.find().count() === 0) {
  Events.insert({
    title: 'Introducing Telescope'
  });

  Events.insert({
    title: 'Meteor'
  });

  Events.insert({
    title: 'The Meteor Book'
  });
}
