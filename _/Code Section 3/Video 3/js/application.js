var App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'exermatic-data'
});

App.Walk = DS.Model.extend({
    dateWalked: DS.attr('date'),
    distanceWalked: DS.attr('number'),
    minutesTaken: DS.attr('number'),
    mood: DS.attr('string')
});