/**
 * Controllers.screen
 * @uses core
 */

var App = require("core");

/**
 * Args passed to this controller
 * @type {Object}
 */
$.params = arguments[0] || {};

var isEditMode = false;
var currentTask = null;

if($.params){
	
	if($.params.id){		
		currentTask = $.params;
		console.log(currentTask);
		isEditMode = true;
		$.taskName.value = $.params.name;
		$.window.title = 'Edit Task';	
	}
	else{
		isEditMode = false;
		$.window.title = 'New Task';	
	}
}

$.saveBtn.addEventListener("click", function(e){
	
	//Search for the existing task and update it.
	if(isEditMode){
		_.each(Alloy.Globals.tasks, function(task){
			if(task.id === currentTask.id){
				task.name = $.taskName.value;
			}
		});
		
		Ti.App.fireEvent('app:taskChanged');		
		$.window.close();
	}
	else{
		//Create a new task
		var newTask = { id: Alloy.Globals.tasks.length, name: $.taskName.value };
		Alloy.Globals.tasks.push(newTask);
		
		Ti.App.fireEvent('app:taskAdded', newTask);		
		$.window.close();
	}
});

/**
 * Handle opening a new screen
 */
function handleMenuItem() {
	App.Navigator.open("taskDetail");
}

if(OS_ANDROID) {
	$.window.addEventListener("open", function() {
		var actionBar = $.window.activity.actionBar;
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function () {
			$.window.close();
		};
	});
} else {
	//$.label.addEventListener("click", handleMenuItem);
}