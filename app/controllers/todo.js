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
		}
	}
});
