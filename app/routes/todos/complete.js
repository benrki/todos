import Ember from 'ember';

export default Ember.Route.extend({
	// Get all todos which are marked complete
	model: function() {
		return this.store.filter('todo', function(todo) {
			return todo.get('isCompleted');
		});
	},

	// Render as index template with default controller
	renderTemplate: function(controller) {
		this.render('todos.index', {
			controller: controller
		});
	}
});
