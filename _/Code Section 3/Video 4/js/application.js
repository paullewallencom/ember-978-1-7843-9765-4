var App = Ember.Application.create({ debug: true });

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'exermatic-data'
});

App.Walk = DS.Model.extend({
    dateWalked: DS.attr('date'),
    distanceWalked: DS.attr('number'),
    minutesTaken: DS.attr('number'),
    mood: DS.attr('string')
});

App.Router.map( function() { 
    this.resource('walks', function() {
        this.route('walk', { path: '/:walk_id' });
    });
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('walks');
    }
});

App.WalksRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('walk');
  }
});
