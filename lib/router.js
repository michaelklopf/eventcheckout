Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('events'), Meteor.subscribe('users'), Meteor.subscribe('lists')]; }
});

Router.route('/', {name: 'home'});

Router.route('/events', {name: 'eventsList'});

Router.route('/events/:_id', {
  name: 'eventPage',
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/lists/:_id', {
  name: 'listPage',
  data: function() {return Lists.findOne(this.params._id); }
});

Router.route('/events/:_id/edit', {
  name: 'eventEdit',
  data: function() { return Events.findOne(this.params._id); }
});

Router.route('/eventsubmit', {name: 'eventSubmit'});

Router.route('/listsubmit', {name: 'listSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: ['eventPage', 'listPage']});
Router.onBeforeAction(requireLogin, {only: ['eventSubmit', 'eventsList', 'listSubmit']});
