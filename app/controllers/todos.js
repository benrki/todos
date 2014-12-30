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
		}
	}
});
