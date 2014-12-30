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
		
		// Check if all todos are completed or none are left
		// or sets all todos to value
		allAreDone: function(key, value) {
			console.log(key + " " + value);
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
	}
});
