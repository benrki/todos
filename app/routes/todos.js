import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// Looks for a model called todo
		return this.store.find('todo');
	}
});
