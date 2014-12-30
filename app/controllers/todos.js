import Ember from 'ember';

export default Ember.ArrayController.extend({
	actions: {
		createTodo: function(newTitle) {
			// Store new todo in new model
			var todo = this.store.createRecord('todo', {
				title: newTitle,
				isCompleted: false
			});

			// Clear the todo text field
			this.set('newTitle', '');

			// Save new model
			todo.save();
		},

				// Clear the completed todos from model
		clearCompleted: function() {
			var completed = this.filterBy('isCompleted', true);
			// Invokes deleteRecord all completed todos
			completed.invoke('deleteRecord');
			// Saves model
			completed.invoke('save');
		}
	},

		// Calculate remaining todos incomplete
		remaining: function() {
			// Get length of array of todos with 
			// isComplete value of false
			return this.filterBy('isCompleted', false).get('length');
			// Set every isCompleted value to be a computed property
		}.property('@each.isCompleted'),

		// Determine whether there are multiple or 
		// just one todos left incomplete
		inflection: function() {
			// Get number of remaining todos
			var remaining = this.get('remaining');
			return (remaining === 1) ? 'item' : 'items';
		}.property('remaining'),

		// Determine if there are any completed todos
		hasCompleted: function() {
			return this.get('completed') > 0;
		}.property('completed'),

		// Gets amount of completed todos
		completed: function() {
			return this.filterBy('isCompleted', true).get('length');
		}.property('@each.isCompleted'),

		// Check if all todos are completed or none are left
		// or sets all todos to value
		allAreDone: function(key, value) {
			Ember.Logger.log("test");
			// Check if a value is given to set all jobs to
			if (value === undefined) {
				// Check if all jobs are completed or none left
				return this.get('length') > 0 && 
				this.isEvery('isCompleted', true);
			} else {
				// Set all jobs to value
				this.setEach('isCompleted', value);
				this.invoke('save');
				return value;
			}
		}.property('@each.isCompleted')

});
