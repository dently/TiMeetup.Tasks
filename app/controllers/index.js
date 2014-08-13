/**
 * @class Controllers.index
 */

// App bootstrap
var App = require("core");
var Cloud = require('ti.cloud');

// Make sure we always have a reference to the navigation window for iOS
if(OS_IOS) {
	App.navigationWindow = $.navWindow;
	App.navigationWindow.open();
} else {
	$.indexWindow.open();
}

// Init our app singleton
App.init();

//Initialize our tasks list here
Alloy.Globals.tasks = [];

//Load our tasks
loadLocalTasks();

//View functions here
function loadLocalTasks(){
	
	if(!Alloy.Globals.tasks || Alloy.Globals.tasks.length === 0){
		Alloy.Globals.tasks = [
		    {id: '1', name: 'Take Out the Trash'},
		    {id: '2', name: 'Do the Dishes'},
		    {id: '3', name: 'Walk the Dog'}
		];
	}
	
	var data = [];

	for (var i = 0; i < Alloy.Globals.tasks.length; i++) {
		var task = Alloy.Globals.tasks[i];
		
	    data.push(
	        { properties: {
	            itemId: task.id,
	            title: task.name,            
	            canEdit: true,          
			    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
	            color: 'black'
	        }
	    });
	}
	
	$.taskList.sections[0].setItems(data);
}


//Listen for view events
$.taskList.addEventListener("itemclick", function(e) {
	var task = Alloy.Globals.tasks[e.itemIndex];
	console.log(e.itemIndex);
	App.Navigator.open("taskDetail", task);
});

$.taskList.addEventListener("delete", function(e){
	console.log("Delete detected.");
	console.log(e.itemId);
	console.log(e.itemIndex);
	Alloy.Globals.tasks.splice(e.itemIndex, 1);
});

$.addTask.addEventListener('click', function(){
	App.Navigator.open("taskDetail");
});


//Listen for Global application events
Ti.App.addEventListener("app:taskAdded", function(e){
	loadLocalTasks();
});

Ti.App.addEventListener("app:taskChanged", function(e){
	loadLocalTasks();
});
