import Ember from 'ember';

// ObjectController for a single todo object
export default Ember.ObjectController.extend({
	// Collection of functions available as action targets
	// i.e. invokeable when an {{action}} is triggered by
	// the template
	actions: {
		// Start editing the text of a todo
		editTodo: function() {
			this.set('isEditing', true);
		},

		// Commit changes to model
		acceptChanges: function() {
			this.set('isEditing', false);

			// If todo is empty, delete from model
			if (Ember.isEmpty(this.get('model.title'))) {
				// Triggers removeTodo on 'this'
				this.send('removeTodo'); 
			} else {
				// Get model and save current changes
				this.get('model').save();
			}
		},

		// Delete todo from model
		removeTodo: function() {
			var todoModel = this.get('model');
			todoModel.deleteRecord();
			todoModel.save();
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
			return this.filterBy('isComplete', false).get('length');

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
		}.property('@each.isCompleted')
});
