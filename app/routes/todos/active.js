import Ember from 'ember';

export default Ember.Route.extend({
	// Get all todos that are not marked complete
	model: function() {
		// Get all todos
		return this.store.filter('todo', function(todo) {
			// Get all todos that are not complete
			return !todo.get('isCompleted');
		});
	},

	// Render index template as own template and 
	// with default controller
	renderTemplate: function(controller) {
		this.render('todos.index', { // template to render
			controller: controller // controller to use
		});
	}
});
