var App = Ember.Application.create({ debug: true });

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'exermatic-data'
});

App.Walk = DS.Model.extend({
    dateWalked: DS.attr('date'),
    distanceWalked: DS.attr('number'),
    minutesTaken: DS.attr('number'),
    mood: DS.attr('string'),
    
    kmPerHour: function() { 
        return 60 * this.get('distanceWalked') / this.get('minutesTaken');
    }.property('distanceWalked', 'minutesTaken')
});

App.Router.map( function() { 
    this.resource('walks', function() {
        this.route('walk', { path: '/:walk_id' });
        this.route('add', { path: 'add' });
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

App.WalksAddController = Ember.Controller.extend({
    error: "",

    actions: {
        addWalk: function() {
            var newDate = this.get('newDate'),
                newDistance = this.get('newDistance'),
                newTime = this.get('newTime'),
                newMood = this.get('newMood');

                if (typeof newDate === 'undefined' ||
                    typeof newDistance === 'undefined' ||
                    typeof newTime === 'undefined' ||
                    typeof newMood === 'undefined') 
                {
                    this.set('error', 'Please populate all the fields');
                    return;
                }

                this.set('error', '');

                walk = this.store.createRecord('walk', {
                    dateWalked: newDate,
                    distanceWalked: newDistance,
                    minutesTaken: newTime,
                    mood: newMood
                });

                walk.save();
                
                this.set('newDate', '');
                this.set('newDistance', '');
                this.set('newTime', '');
                this.set('newMood', '');
                
                this.transitionTo('walks.walk', walk);
        }
    }
});